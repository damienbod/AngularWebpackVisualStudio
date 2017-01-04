import { Configuration } from './../../app.constants';
import { ThingService } from './../../services/thingService';
import { CustomFooterComponent } from './components/customfooter/customfooter.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],

    declarations: [
        NavigationComponent,
        CustomFooterComponent
    ],

    exports: [
        NavigationComponent,
        CustomFooterComponent
    ]
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ThingService,
                Configuration
            ]
        };
    }
}