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
```typescript jsx

import {Component, OnInit, NgZone, ChangeDetectorRef} from '@angular/core';
import { SignalrCore } from 'nativescript-signalr-core/angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
      header: SignalRCoreRHeaders;

    constructor(private zone: NgZone, private cd: ChangeDetectorRef) {
        this.signalrCore = new SignalrCore();
        this.header = new SignalRCoreRHeaders('Authorization', 'myToken');    //(this.header Optional)
        this.signalrCore.on('connected', (data) => {
             console.log('connected');
        });

    }
    connectToServer() {
        this.signalrCore.start('http://server.com/ChatHub', this.header).then((isConnected: boolean) => {
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

## Headers initilization:
var headers={};
headers["Custom-Auth-UserName"]=this.username;
headers["Custom-Auth-Token"]=this.userToken
var header = new SignalRCoreRHeaders(headers);



```


 ## API
 
 ##### .start(url: string, header?: SignalRCoreRHeaders): Promise<boolean>
 ##### .on(event: string, data: any) : args
 ##### .close()
 ##### .invoke(...args): (data, date)
 ##### .getStatus$(): observable<{id: number, name: string}>
 ##### .getStatus(): string<{id: number, name: string}>
 ##### SignalRCoreRHeaders = { key: string, value: string }





