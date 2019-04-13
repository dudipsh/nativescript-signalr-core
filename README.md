# Nativescript Signalr Core

Plugin for signalr core
All my code is LICENSED under the MIT License

## Requirements

This plugin dependent on NativeScript WebSockets plugin
thanks for nathan@master-technology.com
[nativescript-websockets](https://www.npmjs.com/package/nativescript-websockets)
## Installation

Install the plugin
```javascript
tns plugin add nativescript-websockets
tns plugin add nativescript-signalr-core
```

## Usage 

	
	`
	import { Observable } from 'tns-core-modules/data/observable';
    import { SignalrCore } from 'nativescript-signalr-core';
    declare var require;
    var WebSocket = require('nativescript-websockets');
    export class HelloWorldModel extends Observable {
       public message: string;
       private signalrCore: SignalrCore;
     
       constructor() {

         this.signalrCore = new SignalrCore();
     
         this.signalrCore.start('http://server.com/ChatHub').subscribe((res) => {});
         this.signalrCore.on('messagereceived', (args) => {
           console.log(args)
         });
         this.signalrCore.on('connected', (data) => {
           this.message = 'connected';
           this.signalrCore.invoke('JoinRoom', 'room');
           this.signalrCore.invoke('SendMessage', 'android', 'room', 'Android');
         });
       }
    `

## Limitations
Not tested on IOS


