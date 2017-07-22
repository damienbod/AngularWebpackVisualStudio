import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Configuration } from '../../app/app.constants';
import { ThingService } from '../../app/core/services/thing-data.service';
import { HomeComponent } from '../../app/home/components/home.component';

describe('HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let comp: HomeComponent;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                HttpClientTestingModule
            ],
            providers: [
                ThingService,
                Configuration
            ],
            declarations: [HomeComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
    });

    it('on init should get all things', async () => {
        const http = TestBed.get(HttpTestingController);
        const customConfiguration = TestBed.get(Configuration);
        const expectedResponse = [{ id: 1, name: 'NetCore' }];

        const url = customConfiguration.Server + 'api/things/';

        fixture.detectChanges();

        http.expectOne(url).flush(expectedResponse);

        fixture.whenStable().then(() => {
            expect(comp.things).toEqual(expectedResponse);
        });
    })
});
