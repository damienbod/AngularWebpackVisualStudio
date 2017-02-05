var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Configuration } from './../../app.constants';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
export var ThingService = (function () {
    function ThingService(http, configuration) {
        var _this = this;
        this.http = http;
        this.configuration = configuration;
        this.GetAll = function () {
            return _this.http.get(_this.actionUrl).map(function (response) { return response.json(); });
        };
        this.GetSingle = function (id) {
            return _this.http.get(_this.actionUrl + id).map(function (res) { return res.json(); });
        };
        this.Add = function (thingToAdd) {
            var toAdd = JSON.stringify({ name: thingToAdd.name });
            return _this.http.post(_this.actionUrl, toAdd, { headers: _this.headers }).map(function (res) { return res.json(); });
        };
        this.Update = function (id, itemToUpdate) {
            return _this.http
                .put(_this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: _this.headers })
                .map(function (res) { return res.json(); });
        };
        this.Delete = function (id) {
            return _this.http.delete(_this.actionUrl + id);
        };
        this.actionUrl = configuration.Server + 'api/things/';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }
    ThingService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, Configuration])
    ], ThingService);
    return ThingService;
}());
