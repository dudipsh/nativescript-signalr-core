import { NgModule } from "@angular/core";
import { SignalrCore } from './nativescript-signalr-core.service';

@NgModule({
    providers: [SignalrCore],
    exports: [],
})
export class SignalrCoreModule { }
