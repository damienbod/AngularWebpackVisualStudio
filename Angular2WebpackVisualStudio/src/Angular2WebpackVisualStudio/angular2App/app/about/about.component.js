import { Component } from '@angular/core';
export var AboutComponent = (function () {
    function AboutComponent() {
        this.message = "Hello from About";
    }
    AboutComponent.prototype.ngOnInit = function () {
    };
    AboutComponent.decorators = [
        { type: Component, args: [{
                    selector: 'about',
                    template: 'about.component.html'
                },] },
    ];
    AboutComponent.ctorParameters = [];
    return AboutComponent;
}());
