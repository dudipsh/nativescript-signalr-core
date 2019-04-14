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

## How To use nativescript-signalr-core ?
   ##In NativeScript
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
    
    
## In NativeScript + Angular 7    
```TypeScript
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    
constructor(private zone: NgZone, private http: HttpClient, private cd: ChangeDetectorRef) {
        this.signalrCore = new SignalrCore();
        this.signalrCore.start('http://server.com/ChatHub').then(() => {})
        this.zone.run(() => {
            this.signalrCore.on('myServerEvent', (data) => {
                this.messages.push(data);
                 this.cd.detectChanges();
            });
        });

    }
    joinRoom() {
        this.signalrCore.invoke('JoinRoom', 'roomName');
    }
    sendMessage() {
     this.signalrCore.invoke('SendMessage', 'message', 'roomName', 'user');
    }
}
```

## API
   ####.start(url: string): boolean
   ####.on(event: string, data: any) : args
   ####.invoke(...args)

## Limitations
Not tested on IOS


