import { inject, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
    Http,
    ConnectionBackend,
    BaseRequestOptions,
    Response,
    ResponseOptions
} from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Configuration } from '../../app/app.constants';
import { ThingService } from '../../app/core/services/thing-data.service';
import { HomeComponent } from '../../app/home/components/home.component';

describe('HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let comp: HomeComponent;

    const configuration = new Configuration();
    const actionUrl: string = configuration.Server + 'api/things/';

    // Multiple requests with different URL.
    const responses: any = {};
    const data: any = JSON.stringify([{ id: 1, name: 'NetCore' }]);
    responses[actionUrl + 'all/'] = new Response(new ResponseOptions({ body: data }));

    function expectURL(backend: MockBackend, responses: any) {
        backend.connections.subscribe((c: MockConnection) => {
            const response: any = responses[c.request.url];
            c.mockRespond(response);
        });
    }

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            providers: [
                BaseRequestOptions,
                MockBackend,
                ThingService,
                Configuration,
                {
                    provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }, deps: [MockBackend, BaseRequestOptions]
                }
            ],
            declarations: [HomeComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
    });

    it('on init should get all things', async(
        inject([ThingService, MockBackend],
            (dataService: ThingService, backend: MockBackend) => {
                // Mock backend for testing the Http service.
                expectURL(backend, responses);

                fixture.detectChanges();
                // Waits for async response.
                fixture.whenStable().then(() => {
                    // Updates view with data.
                    fixture.detectChanges();

                    expect(JSON.stringify(comp.things)).toEqual(data);
                });
            })
    ));

});
