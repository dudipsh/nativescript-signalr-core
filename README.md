# Nativescript Signalr Core

Plugin for signalr core in NativeScript
All my code is LICENSED under the MIT License

## Requirements

This plugin dependent on NativeScript WebSockets plugin
thanks for nathan@master-technology.com
[nativescript-websockets](https://www.npmjs.com/package/nativescript-websockets)
## Installation


```javascript
tns plugin add nativescript-websockets
npm install nativescript-signalr-core --save
```
## Android 
###### AndroidManifest.xml
````Xml
<uses-permission android:name="android.permission.INTERNET"/>
<application android:usesCleartextTraffic="true">
````



## How To use nativescript signalr core ?
###### main.tns.ts
```TypeScript
    declare var require;
    var WebSocket = require('nativescript-websockets');
````
###### Home.component.ts
## In NativeScript + Angular 7  
```TypeScript
import {Component, OnInit, NgZone, ChangeDetectorRef} from '@angular/core';
import { SignalrCore } from 'nativescript-signalr-core/angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    
constructor(private zone: NgZone, private cd: ChangeDetectorRef) {
        this.signalrCore = new SignalrCore();
        this.signalrCore.start('http://server.com/ChatHub').then(() => {})
        this.zone.run(() => {
            this.signalrCore.on('myServerEvent', (isConnected) => {
                if(isConnected) {
                    console.log('Connected')
                    this.cd.detectChanges();
                }
            });
        });

    }
    joinRoom() {
        this.signalrCore.invoke('JoinRoom', 'roomName')
        .then((res) => { console.log(res) }); // Optional
    }
    sendMessage() {
     this.signalrCore.invoke('SendMessage', 'message', 'roomName', 'user');
    }
}
```

## API
##### .start(url: string): Promise<boolean>
##### .on(event: string, data: any) : args
##### .close()
##### .invoke(...args): (data, date)




