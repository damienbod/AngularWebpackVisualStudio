import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Configuration } from './../../app.constants';
import { Thing } from './../../models/thing';

@Injectable()
export class ThingService {

    private actionUrl: string;
    private headers: HttpHeaders;

    constructor(private http: HttpClient, configuration: Configuration) {

        this.actionUrl = configuration.Server + 'api/things/';

        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');
    }

    getAll(): Observable<Thing[]> {
        return this.http.get<Thing[]>(this.actionUrl, { headers: this.headers });
    }

    getSingle(id: number): Observable<Thing> {
        return this.http.get<Thing>(this.actionUrl + id, { headers: this.headers });
    }

    add(thingToAdd: Thing): Observable<Thing> {
        const toAdd = JSON.stringify({ name: thingToAdd.name });

        return this.http.post<Thing>(this.actionUrl, toAdd, { headers: this.headers });
    }

    update(id: number, itemToUpdate: any): Observable<Thing> {
        return this.http
            .put<Thing>(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers });
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(this.actionUrl + id, { headers: this.headers });
    }
}
