import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BankStoreService } from '../modules/Services/bankService/bank.store.service';
import { Branch } from '../modules/Services/branchService/branch-model';
import { Bank } from '../modules/Services/bankService/bank-model';
import { BranchStoreService } from '../modules/Services/branchService/branch.store.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-bank-owner',
  templateUrl: './bank-owner.component.html',
  styleUrls: ['./bank-owner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class BankOwnerComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.subscrption.unsubscribe();
  }
  //if we should display that it is loading. One for the banjs and one for the branches
  loadingBank: boolean=true;
  loadingBranch: boolean= true;
  //where i put the data that i get from the store
  errors: string[]=new Array<string>();
  banks$: Observable<Array<Bank>>;
  branches$ : Observable<Array<Branch>>;
 
  //What the checkBox Selects. Default value is Banks[0]/
  selectedBank: Bank= new Bank();
  
  //For adding a new branch
  addBranch: boolean=false;
  newBranch :FormGroup;
  subscrption: Subscription;
  //Banks sum.
  constructor(private bankStoreService: BankStoreService, private branchStoreService: BranchStoreService,
    private fb :FormBuilder, private cd: ChangeDetectorRef) {
    this.newBranch= fb.group(new Branch());
    this.banks$=this.bankStoreService.getBanks();
    this.subscrption=this.bankStoreService.getSelected().subscribe(bank=>{
      this.addBranch=false;
      this.newBranch= this.fb.group(new Branch());
      this.errors= new Array<string>();
      this.loadingBranch=false;
      if(bank.name!=""){
        this.selectedBank=bank;
        this.branchStoreService.loadBranch(false,bank.name);
      }

     });   
     this.branches$=this.branchStoreService.getBranches();
     
  }
  errorControl() : boolean{
    this.errors= new Array<string>()
    if(this.newBranch.value.name==null ||this.newBranch.value.x==0 || this.newBranch.value.y==0){
      this.errors.push("fill it all");
      this.cd.detectChanges();
      return false;
    }
    return true;
    
  }
  submit(currentBank: string){
    this.bankStoreService.updateSelected(currentBank);
  }
  postBranch(){
    if(this.errorControl()){
      this.branchStoreService.getBranchByName(this.newBranch.value.name).then(res=>{
        if(res){
          //already exists
          this.errors.push("the name already exists");
          this.cd.detectChanges();
        }
        else{
          //Updating
          this.newBranch.value.bank=this.selectedBank.name;
          this.branchStoreService.addBranch(this.newBranch.value);
          //Reseting
          this.addBranch=false;
          this.cd.markForCheck();
          this.newBranch= this.fb.group(new Branch());
        }
      });
    }
  }
  
  ngOnInit() {
    this.bankStoreService.isLoading().subscribe(res=> {
      this.loadingBank= !res;
      this.cd.detectChanges();
     });
     this.branchStoreService.isLoading().subscribe(res=> {
       this.loadingBranch= !res;
       this.cd.detectChanges();
     });
  }

}
