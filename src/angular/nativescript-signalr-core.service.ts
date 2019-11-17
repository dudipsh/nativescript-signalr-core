import {BehaviorSubject} from 'rxjs';
import {SignalRCoreRHeaders} from "../signalr-core.common";
declare var WebSocket;



export class SignalrCore {
    private isConnected: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private _status: BehaviorSubject<Status> = new BehaviorSubject<Status>(null);
    public _getStatus: Status = {name: 'No Start', id: -1};
    private websocket;
    private methods = {};
    private callbacks = {};
    private id: string;
    private recordSeparator = String.fromCharCode(0x1e);
    private roomId = 0;
    private socketUrl = '';
    private protocol = {
        name: 'json',
        transferFormat: 1,
        version: 1,
        writeMessage: (message) => {
            return TextMessageFormat.write(JSON.stringify(message));
        }
    };
    private setStatus(status: Status) {
        this._status.next(status);
        this._getStatus = status;
    }

    public getStatus$() {
        return this._status.asObservable();
    }
    public getStatus() {
        return this._getStatus;
    }
    public start(httpURL, header?: SignalRCoreRHeaders) {

        return new Promise((resolve, reject) => {
            const run = () => {
                this.socketUrl = httpURL.replace(/(http)(s)?\:\/\//, 'ws$2://');
                this.socketUrl += '?id=';
                const self = this;
                // @ts-ignore
                this.makeRequest(header, 'POST', `${httpURL}/negotiate`, (err, data) => {
                    this.setStatus({id: 0, name: 'Start negotiate'});
                    if (err) {
                        reject(err);
                        this.setStatus({id: -1, name: 'Error negotiate'});
                        return false;
                    } else {
                        let connId = this.socketUrl;
                        this.setStatus({id: 1, name: 'Ok, negotiate'});
                        if (typeof data === 'object') {
                            connId = data.connectionId;
                        } else {
                            const _data = JSON.parse(data);
                            connId = _data.connectionId;
                        }
                        this.socketUrl += connId;
                        return self.openSocketConnection(this.socketUrl)
                        // @ts-ignore
                            .then((res) => {
                                this.setStatus({id: 2, name: 'Socket Opened'});
                                if (res) {
                                    this.isConnected.next(true);
                                    resolve(true);
                                    return true;
                                }
                            });
                    }
                });
            };
            if (this.websocket && this.websocket.readyState && this.websocket.readyState !== WebSocketStatus.Closed) {
                this.close();
                reject('Error');
                return run();

            } else {
                return run();
            }
        });
    }


    private openSocketConnection(socketUrl): Promise<any> {
        return new Promise((resolve, reject) => {
            this.websocket = new WebSocket(socketUrl, this.recordSeparator [JSON.stringify(this.protocol)]);
            this.websocket.onopen = (event) => {
                this.websocket.send(JSON.stringify({'protocol': 'json', 'version': 1}));
                this.websocket.send(this.recordSeparator);
            };
            this.websocket.onmessage = (data: any) => this._onMessage(data);
            this.websocket.onclose = (data: any) => { 
                this.close(); 
                if(this.methods['disconnected']) {
                    this.methods['disconnected'][0](data);
                }
            };        
            this.websocket.onerror = (err) => reject(err);
            return resolve(this.websocket);
        });
    }

    public close() {
        return new Promise((resolve, reject) => {
            if (this.websocket && this.websocket.readyState !== WebSocketStatus.Closed) {
                this.websocket.close();
                resolve('SignalR - Connection closed!');
                this.setStatus({id: -1, name: 'Socket closed!'});
            }
            reject('Error - Connection already close!');
        });
    }

    public on(methodName: string, newMethod: (...args: any[]) => void) {
        if (!methodName || !newMethod) {
            return;
        }

        methodName = methodName.toLowerCase();
        if (!this.methods[methodName]) {
            this.methods[methodName] = [];
        }

        if (this.methods[methodName].indexOf(newMethod) !== -1) {
            return;
        }

        this.methods[methodName].push(newMethod);
    }

    public invoke(methodName, ...args: any[]) {
        for (let _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        const invocationDescriptor = this.createInvocation(methodName, args, false);
        let _invocationEvent =  null;
        return new Promise((resolve, reject) => {
            if (!this.websocket) {
                return reject('Error - did you call start(hubUrl) ?')
            }
            if (this.websocket && this.websocket.readyState === 3) {
                return reject('Error - socket is not connected')
            }
            this.callbacks[invocationDescriptor.invocationId] = (invocationEvent, error) => {
                if (error) {
                    reject(error);
                    return;
                } else if (invocationEvent) {
                    if (invocationEvent.type === MessageType.Completion) {
                        if (invocationEvent.error) {
                            reject(new Error(invocationEvent.error));
                        } else {
                            resolve(invocationEvent.result);
                        }
                    } else {
                        reject(new Error('Unexpected message type: ' + invocationEvent.type));
                    }
                }
            };
            const message = this.protocol.writeMessage(invocationDescriptor);
            this.websocket.send(message);
            resolve({data: TextMessageFormat.parse(message), date: new Date()});

        });
    }

    private createInvocation(methodName: string, args, nonblocking) {
        if (nonblocking) {
            return {
                arguments: args,
                target: methodName,
                type: MessageType.Invocation,
            };
        } else {

            const id = this.roomId;
            this.roomId++;
            return {
                arguments: args,
                invocationId: id.toString(),
                target: methodName,
                type: MessageType.Invocation,
            };
        }
    }

    private _onMessage(event: MessageEvent) {
        const {data, target} = event;
        const parseData = TextMessageFormat.parse(data);
        const parseTarget = JSON.parse(parseData[0]);
        if (parseTarget && parseTarget['type'] && parseTarget['type'] !== 3) {
            if (parseTarget['type'] === MessageType.Invocation && parseTarget.target && this.methods[parseTarget.target.toLowerCase()]) {
                this.methods[parseTarget.target.toLowerCase()][0](parseTarget);
            }
        }
    }

    private makeRequest(header: SignalRCoreRHeaders, method, url, done) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        if (header) {
            xhr.setRequestHeader(header.key, header.value);
        }
        xhr.onload = function () {
            done(null, xhr.response);
        };
        xhr.onerror = function () {
            done(xhr.response);
        };
        xhr.send();
    }
}

export enum WebSocketStatus {
    Connecting = 0,
    Open = 1,
    Closing = 2,
    Closed = 3

}

export enum MessageType {
    Invocation = 1,
    StreamItem = 2,
    Completion = 3,
    StreamInvocation = 4,
    CancelInvocation = 5,
    Ping = 6,
    Close = 7,
}

export class TextMessageFormat {
    public static RecordSeparatorCode = 0x1e;
    public static RecordSeparator = String.fromCharCode(TextMessageFormat.RecordSeparatorCode);

    public static write(output: string): string {
        return `${output}${TextMessageFormat.RecordSeparator}`;
    }

    public static parse(input: string): string[] {
        if (input[input.length - 1] !== TextMessageFormat.RecordSeparator) {
            throw new Error('incomplete.');
        }

        const messages = input.split(TextMessageFormat.RecordSeparator);
        messages.pop();
        return messages;
    }
}
export class Status {
    name: string;
    id: number;
}
