import { Component } from '@angular/core';

@Component({
    selector: 'customfooter',
    templateUrl: 'customfooter.component.html'
})

export class CustomFooterComponent {
    public currentYear: number = new Date().getFullYear();
}