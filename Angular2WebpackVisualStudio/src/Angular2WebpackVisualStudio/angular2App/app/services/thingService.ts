import { Thing } from './../models/thing';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';

@Injectable()
export class ThingService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {

        this.actionUrl = _configuration.Server + 'api/things/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public GetAll = (): Observable<Thing[]> => {
        return this._http.get(this.actionUrl).map((response: Response) => <Thing[]>response.json());
    }

    public GetSingle = (id: number): Observable<Thing> => {
        return this._http.get(this.actionUrl + id).map(res => <Thing>res.json());
    }

    public Add = (thingToAdd: Thing): Observable<Thing> => {
        var toAdd = JSON.stringify({ name: thingToAdd.name });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers }).map(res => <Thing>res.json());
    }

    public Update = (id: number, itemToUpdate: any): Observable<Thing> => {
        return this._http
            .put(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers })
            .map(res => <Thing>res.json());
    }

    public Delete = (id: number): Observable<any> => {
        return this._http.delete(this.actionUrl + id);
    }
}