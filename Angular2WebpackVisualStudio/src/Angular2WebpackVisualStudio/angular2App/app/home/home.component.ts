import { Thing } from './../models/thing';
import { Component, OnInit } from '@angular/core';
import { TestDataService } from '../services/testDataService';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    public message: string;
    public things: Thing[] = [];
    public thing: Thing = new Thing();

    constructor(private _dataService: TestDataService) {
        this.message = "Things from the ASP.NET Core API";
    }

    ngOnInit() {
        this.getAllThings();
    }

    public addThing() {
        this._dataService
            .Add(this.thing)
            .subscribe(() => {
                this.getAllThings();
                this.thing = new Thing();
            }, (error) => {
                console.log(error);
            });
    }

    public deleteThing(thing: Thing) {
        this._dataService
            .Delete(thing.id)
            .subscribe(() => {
                this.getAllThings();
            }, (error) => {
                console.log(error);
            });
    }

    private getAllThings() {
        this._dataService
            .GetAll()
            .subscribe(
            data => this.things = data,
            error => console.log(error),
            () => console.log('Get all complete')
            );
    }
}
