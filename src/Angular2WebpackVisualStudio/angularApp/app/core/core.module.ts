import { ThingService } from './services/thing-data.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Configuration } from '../app.constants';

@NgModule({
    imports: [
        CommonModule
    ]
})

export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                ThingService,
                Configuration
            ]
        };
    }
}