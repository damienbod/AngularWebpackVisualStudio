import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';

import { AboutComponent } from './about.component';

describe('WithExternalServiceComponent', () => {
    let component: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule],
            declarations: [AboutComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AboutComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();

    });

    it('message on component should be correct', () => {
        expect(component.message).not.toBeDefined();

        fixture.detectChanges();
        expect(component.message).toBeDefined();

        expect(component.message).toBe('Hello from AboutComponent constructor');
    });

    it('message on template should be correct', () => {
        expect(component.message).not.toBeDefined();
        expect(fixture.debugElement.query(By.css('h1')).nativeElement.innerHTML).toBe('');

        fixture.detectChanges();
        expect(component.message).toBeDefined();
        expect(fixture.debugElement.query(By.css('h1')).nativeElement.innerHTML)
            .toBe('Hello from AboutComponent constructor');
    });
});
