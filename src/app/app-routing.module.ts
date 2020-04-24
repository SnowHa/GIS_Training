import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankFactoryComponent } from './bank-factory/bank-factory.component';

import { GISGuard } from './bank-factory/bank-factory.guard';
import { BankOwnerComponent } from './bank-owner/bank-owner.component';
import { BranchAdminComponent } from './branch-admin/branch-admin.component';
import { CustomerComponent } from './customer/customer.component';
import { MapComponent } from './map/map.component';
import { BankOwnerFullComponent } from './bank-owner-full/bank-owner-full.component';

const routes: Routes = [
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  { path: 'bank-factory', component: BankFactoryComponent, canActivate:[GISGuard] },
  { path: 'bank-owner', component: BankOwnerFullComponent},
  { path: 'branch-admin', component: BranchAdminComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'map', component: MapComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
