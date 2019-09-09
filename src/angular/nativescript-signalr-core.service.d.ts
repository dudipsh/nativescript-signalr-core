export declare class SignalrCore {
    private isConnected;
    private _status;
    _getStatus: Status;
    private websocket;
    private methods;
    private callbacks;
    private id;
    private recordSeparator;
    private roomId;
    private socketUrl;
    private protocol;
    private setStatus;
    getStatus$(): import("rxjs").Observable<Status>;
    getStatus(): Status;
    start(httpURL: any): Promise<{}>;
    private openSocketConnection;
    close(): Promise<{}>;
    on(methodName: string, newMethod: (...args: any[]) => void): void;
    invoke(methodName: any, ...args: any[]): Promise<{}>;
    private createInvocation;
    private _onMessage;
    private makeRequest;
}
export declare enum WebSocketStatus {
    Connecting = 0,
    Open = 1,
    Closing = 2,
    Closed = 3
}
export declare enum MessageType {
    Invocation = 1,
    StreamItem = 2,
    Completion = 3,
    StreamInvocation = 4,
    CancelInvocation = 5,
    Ping = 6,
    Close = 7
}
export declare class TextMessageFormat {
    static RecordSeparatorCode: number;
    static RecordSeparator: string;
    static write(output: string): string;
    static parse(input: string): string[];
}
export declare class Status {
    name: string;
    id: number;
}
