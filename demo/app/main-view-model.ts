import { Observable } from 'tns-core-modules/data/observable';

import {SignalrCore, SignalRCoreRHeaders} from "nativescript-signalr-core";

export class HelloWorldModel extends Observable {
  public message: string;
  private signalrCore: SignalrCore;
  private hubUrl = 'http://myServer.com/messageshub';
  header: SignalRCoreRHeaders;
  constructor() {
    super();
    this.header = new SignalRCoreRHeaders('Authorization', 'myToken');  // optional
    this.signalrCore = new SignalrCore();


    this.signalrCore.on('messageshub', (args) => {
      console.log(args);
    });
    this.signalrCore.on('connected', (data) => {
      this.message = 'connected';
      this.signalrCore.invoke('JoinRoom', 'room');
      this.signalrCore.invoke('SendMessage', 'android', 'room', 'Android');
    });
  }

    connectToServer() {
      this.signalrCore.start(this.hubUrl, this.header).then((res) => {});

  }
}
