import { Component } from '@angular/core';

@Component({
    selector: 'app-custom-footer',
    templateUrl: './customfooter.component.html'
})

export class CustomFooterComponent {
    currentYear: number = new Date().getFullYear();
}
