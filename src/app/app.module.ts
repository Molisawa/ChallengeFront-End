import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import {InputTextModule} from 'primeng/inputtext';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms'; 


import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { GridComponent } from './components/grid/grid.component';


import { DataService } from './services/api.service';
import { AdviserComponent } from './components/adviser/adviser.component';
import { DatePipe } from '@angular/common';


const routes: Routes = [
  { path: '', component: GridComponent , pathMatch: 'full'},
  { path: '',  redirectTo: 'form', pathMatch: 'full' },
  { path: 'grid', component: GridComponent },
  { path: 'form', component: FormComponent },
  { path: 'adviser', component: AdviserComponent },
  { path: '**',  redirectTo: '', pathMatch: 'full'}
];

export class AppRoutingModule {}

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    GridComponent,
    AdviserComponent
  ],
  imports: [
    BrowserModule,
    CardModule,
    TableModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule
    
  ],
  providers: [DataService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
