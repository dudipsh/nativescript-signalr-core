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
      header: SignalRCoreRHeaders;

constructor(private zone: NgZone, private cd: ChangeDetectorRef) {
        this.signalrCore = new SignalrCore();
        // this.header Optional.
        this.header = new SignalRCoreRHeaders('Authorization', 'myToken');

        this.signalrCore.start('http://server.com/ChatHub', this.header).then(() => {})
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
## In NativeScript Core
```TypeScript
 
```

## API
##### .start(url: string, header?: SignalRCoreRHeaders): Promise<boolean>
##### .on(event: string, data: any) : args
##### .close()
##### .invoke(...args): (data, date)
##### .getStatus$(): observable<{id: number, name: string}>
##### .getStatus(): string<{id: number, name: string}>
##### SignalRCoreRHeaders = { key: string, value: string }


