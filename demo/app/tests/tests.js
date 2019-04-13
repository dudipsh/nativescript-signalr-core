var SignalrCore = require("nativescript-signalr-core").SignalrCore;
var signalrCore = new SignalrCore();

describe("greet function", function() {
    it("exists", function() {
        expect(signalrCore.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(signalrCore.greet()).toEqual("Hello, NS");
    });
});