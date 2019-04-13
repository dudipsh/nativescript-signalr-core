import { Observable } from 'tns-core-modules/data/observable';
import { SignalrCore } from 'nativescript-signalr-core';

export class HelloWorldModel extends Observable {
  public message: string;
  private signalrCore: SignalrCore;
  private hubUrl = 'http://server.com/ChatHub';
  constructor() {
    super();
    this.signalrCore = new SignalrCore();

    this.signalrCore.start(this.hubUrl).subscribe((res) => {});
    this.signalrCore.on('messagereceived', (args) => {
      console.log(args);
    });
    this.signalrCore.on('connected', (data) => {
      this.message = 'connected';
      this.signalrCore.invoke('JoinRoom', 'room');
      this.signalrCore.invoke('SendMessage', 'android', 'room', 'Android');
    });
  }
}
