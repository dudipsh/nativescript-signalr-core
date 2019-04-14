import { NgModule } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";

import {SignalrCore} from './nativescript-signalr-core.service';

@NgModule({
    providers: [SignalrCore],
    exports: [SignalrCore],
})
export class SignalrCoreModule { }
