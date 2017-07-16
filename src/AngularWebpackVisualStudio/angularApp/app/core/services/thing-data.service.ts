import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Configuration } from './../../app.constants';
import { Thing } from './../../models/thing';

@Injectable()
export class ThingService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http, private configuration: Configuration) {

        this.actionUrl = configuration.Server + 'api/things/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public GetAll = (): Observable<Thing[]> => {
        return this.http.post(this.actionUrl + 'all/', '', { headers: this.headers }).map((response: Response) => <Thing[]>response.json());
    }

    public GetSingle = (id: number): Observable<Thing> => {
        return this.http.get(this.actionUrl + id).map(res => <Thing>res.json());
    }

    public Add = (thingToAdd: Thing): Observable<Thing> => {
        const toAdd = JSON.stringify({ name: thingToAdd.name });

        return this.http.post(this.actionUrl, toAdd, { headers: this.headers }).map(res => <Thing>res.json());
    }

    public Update = (id: number, itemToUpdate: any): Observable<Thing> => {
        return this.http
            .put(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers })
            .map(res => <Thing>res.json());
    }

    public Delete = (id: number): Observable<any> => {
        return this.http.delete(this.actionUrl + id);
    }
}
