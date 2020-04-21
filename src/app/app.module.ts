import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BankFactoryComponent } from './bank-factory/bank-factory.component';
import { GISGuard } from './bank-factory/bank-factory.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BankOwnerComponent } from './bank-owner/bank-owner.component';
import { BranchAdminComponent } from './branch-admin/branch-admin.component';
import { CustomerComponent } from './customer/customer.component';

//materials
//import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MapComponent } from './map/map.component';
@NgModule({
  declarations: [
    AppComponent,
    BankFactoryComponent,
    BankOwnerComponent,
    BranchAdminComponent,
    CustomerComponent,
    MapComponent
  ],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
   // MatTabsModule,
   BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GISGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
