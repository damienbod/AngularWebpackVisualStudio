import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Configuration } from '../app.constants';
export var TestDataService = (function () {
    function TestDataService(_http, _configuration) {
        var _this = this;
        this._http = _http;
        this._configuration = _configuration;
        this.GetAll = function () {
            return _this._http.get(_this.actionUrl).map(function (response) { return response.json(); });
        };
        this.GetSingle = function (id) {
            return _this._http.get(_this.actionUrl + id).map(function (res) { return res.json(); });
        };
        this.Add = function (itemName) {
            var toAdd = JSON.stringify({ ItemName: itemName });
            return _this._http.post(_this.actionUrl, toAdd, { headers: _this.headers }).map(function (res) { return res.json(); });
        };
        this.Update = function (id, itemToUpdate) {
            return _this._http
                .put(_this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: _this.headers })
                .map(function (res) { return res.json(); });
        };
        this.Delete = function (id) {
            return _this._http.delete(_this.actionUrl + id);
        };
        this.actionUrl = _configuration.Server + 'api/values/';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    TestDataService.decorators = [
        { type: Injectable },
    ];
    TestDataService.ctorParameters = [
        { type: Http, },
        { type: Configuration, },
    ];
    return TestDataService;
}());
