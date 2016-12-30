import { CustomFooterComponent } from './components/customfooter/customfooter.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { Configuration } from './../app.constants';
import { TestDataService } from './../services/testDataService';
import { NgModule } from '@angular/core';
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
    ],

    providers: [
        TestDataService,
        Configuration
    ]
})

export class SharedModule { }