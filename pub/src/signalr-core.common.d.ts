import { Observable } from 'tns-core-modules/data/observable';
export declare class Common extends Observable {
    private isConnected;
    private websocket;
    private methods;
    private callbacks;
    private id;
    private recordSeparator;
    private roomId;
    private socketUrl;
    private protocol;
    start(httpURL: any): import("rxjs").Observable<boolean>;
    private openSocketConnection;
    on(methodName: string, newMethod: (...args: any[]) => void): void;
    invoke(methodName: any, ...args: any[]): Promise<{}>;
    private createInvocation;
    private _onMessage;
    private makeRequest;
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
