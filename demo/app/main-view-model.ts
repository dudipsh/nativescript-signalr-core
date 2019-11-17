import {Observable} from 'tns-core-modules/data/observable';

import {SignalrCore} from "../../src";

declare var WebSocket;

export class HelloWorldModel extends Observable {
    public message: string;
    private signalrCore: SignalrCore;
    private hubUrl = 'http://dev.api.mydomin.com/signalr';

    constructor() {
        super();
        // this.header = new SignalRCoreRHeaders('Authorization', 'myToken');  // optional
        this.signalrCore = new SignalrCore();
        this.signalrCore.on('connected', () => {
            console.log('connected');
        });
        this.signalrCore.on('disconnected', () => {
        	console.log("disconnected");
        });
        this.signalrCore.on('initializeDeviceAsync', (data) => {
            console.log('*initializeDeviceAsync*');
        });
    }

    connectToServer() {
        this.signalrCore.start(this.hubUrl).then((isConnected: boolean) => {
            console.log('isConnected? ', isConnected);
        });
    }

    invoke() {
        this.signalrCore.invoke('initializeDeviceAsync', '');
    }

    stop() {
        this.signalrCore.close().then((res) => {
            console.log('closed...', res);
        });
    }
}
