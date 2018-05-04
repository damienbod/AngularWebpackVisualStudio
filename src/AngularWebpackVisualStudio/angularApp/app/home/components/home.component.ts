import { Component, OnInit } from '@angular/core';

import { ThingService } from './../../core/services/thing-data.service';
import { Thing } from './../../models/thing';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  message: string;
  things: Thing[] = [];
  thing: Thing = new Thing();

  constructor(private dataService: ThingService) {
    this.message = 'Things from the ASP.NET Core API';
  }

  ngOnInit() {
    this.getAllThings();
  }

  addThing() {
    this.dataService.add(this.thing).subscribe(
      () => {
        this.getAllThings();
        this.thing = new Thing();
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteThing(thing: Thing) {
    this.dataService.delete(thing.id).subscribe(
      () => {
        this.getAllThings();
      },
      error => {
        console.log(error);
      }
    );
  }

  private getAllThings() {
    this.dataService
      .getAll()
      .subscribe(
        data => (this.things = data),
        error => console.log(error),
        () => console.log('Get all complete')
      );
  }
}
