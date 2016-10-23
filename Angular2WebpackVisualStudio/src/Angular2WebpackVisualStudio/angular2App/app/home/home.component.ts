import { Component, OnInit } from '@angular/core';
import { TestDataService } from '../services/testDataService';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html',
    providers: [TestDataService]
})

export class HomeComponent implements OnInit {

    public message: string;
    public values: any[];

    constructor(private _dataService: TestDataService) {
        this.message = "Hello from HomeComponent constructor";
    }

    ngOnInit() {
        this._dataService
            .GetAll()
            .subscribe(
            data => this.values = data,
            error => console.log(error),
            () => console.log('Get all complete')
            );
    }
}
