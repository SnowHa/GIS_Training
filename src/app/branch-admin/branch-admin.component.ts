import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Client } from '../modules/Services/clientService/client-model';
import { ClientStoreService } from '../modules/Services/clientService/client.store.service';
import { Branch } from '../modules/Services/branchService/branch-model';
import { BranchStoreService } from '../modules/Services/branchService/branch.store.service';
import { Observable, Subscription } from 'rxjs';
import { Bank } from '../modules/Services/bankService/bank-model';
import { BankStoreService } from '../modules/Services/bankService/bank.store.service';

@Component({
  selector: 'app-branch-admin',
  templateUrl: './branch-admin.component.html',
  styleUrls: ['./branch-admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class BranchAdminComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscription.forEach(sub=> sub.unsubscribe());
  }
  subscription: Subscription[]= new Array<Subscription>();
  tempSubscription : Subscription[] = new Array<Subscription>();
  loadingBranch: boolean;
  loadingClient: boolean;
  errors: Array<string> = new Array<string>();
  //where i put the data that i get from the store
  banks$: Observable<Array<Bank>>
  clients$: Observable<Array<Client>>;
  branches$: Observable<Array<Branch>>;
  selectedBranch: Branch= new Branch();
  selectedBank: Bank=new Bank();
  //For adding a new client
  addClient: boolean=false;
  newClient :FormGroup;


  constructor(private bankStoreService: BankStoreService,private branchStoreService: BranchStoreService, private clientStoreService: ClientStoreService,
    private fb :FormBuilder, private cd : ChangeDetectorRef) {
    this.newClient= fb.group(new Client());
    this.banks$=bankStoreService.getBanks(true);
    this.subscription.push(this.bankStoreService.getSelected().subscribe(bank=>{
      if(bank.name){
        this.branchStoreService.loadBranch(true,bank.name);
      }
    }))
    this.branches$= this.branchStoreService.getBranches(false);
    this.subscription.push(this.branchStoreService.getSelected().subscribe(branch=>{
      this.addClient=false;
      this.newClient= this.fb.group(new Client());
      this.errors=new Array<string>();
      if(branch.name){
        this.selectedBranch=branch;
        this.clientStoreService.loadClientsByBranch(branch.name);
      }}));
      this.clients$=this.clientStoreService.getClientsObservable();
    }
    updateBank(bank: string){
      this.bankStoreService.updateSelected(bank);
     }
  
    updateBranch(branch: string){
    this.branchStoreService.updateSelected(branch);
   }
   errorControl() : boolean{
     this.errors= new Array<string>();
     if(this.newClient.value.id==null || this.newClient.value.dateOfBirth== null || this.newClient.value.firstName==null || this.newClient.value.lastName==null){
       this.errors.push("fill it all");
       this.cd.detectChanges();
       return false;
     }
     return true;
   }

  postClient(){
    if(this.errorControl()){
      this.tempSubscription.push(this.clientStoreService.getClientById(this.newClient.value.id).subscribe((res)=>{
        if(res){
          this.errors.push("the ID already exists");
          this.cd.detectChanges();
        }
        else{
          this.newClient.value.branch=this.selectedBranch.name;
          this.clientStoreService.addClient(this.newClient.value);
          this.addClient=false;
          this.cd.markForCheck();
          this.newClient= this.fb.group(new Client());
        }
        this.tempSubscription.pop().unsubscribe();
      }));
    }
  }
  

  ngOnInit() {
    this.branchStoreService.isLoading().subscribe(res=> {
      this.loadingBranch= !res;
      this.cd.markForCheck();
     });
     this.clientStoreService.isLoading().subscribe(res=> {
      this.loadingClient= !res;
      this.cd.markForCheck();
     });
     
  }

}
