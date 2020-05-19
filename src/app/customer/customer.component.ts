import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ClientStoreService } from '../modules/Services/clientService/client.store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../modules/Services/clientService/client-model';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { BranchStoreService } from '../modules/Services/branchService/branch.store.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class CustomerComponent implements OnInit {
  loginForm: FormGroup; 
  addSubForm: FormGroup;
  loading: boolean=false;
  inCorrectId: boolean=false;
  clientId: number;
  selectedClient : Client;
  selectedClientsBank: string;
  selection: string;
  selectionOptions: any= {"Details":"blue solid 5px","Deposit":"blue solid 5px", "Withdraw":"blue solid 5px", "Logout":"blue solid 5px"};
  constructor(private clientStoreService: ClientStoreService,private fb: FormBuilder, private cd: ChangeDetectorRef, private branchStoreService: BranchStoreService) {
    //b: bank[];
    this.changeSelection("Logout")
    this.loginForm = fb.group({ 
      'Id': [, Validators.required],
    });
   

    //bankStoreService.loadBanks();
    //clientStoreService.isLoading().subscribe(res=> {
      //this.loading= !res;
     //});
  }
  changeSelection(newSel :string){
    if(newSel=="Login" || newSel=="Logout"){
      this.selection="Login";
      newSel="Logout"
    }
    else {this.selection=newSel;}
    for(let key in this.selectionOptions){
          this.selectionOptions[key]= key==newSel?"black solid 5px": "blue solid 5px";        
    }
  }
  login(){
   /// console.log("value is "+ value);
    this.clientStoreService.getClientById(this.loginForm.controls.Id.value).pipe(take(1)).subscribe(res=>{
        if(res){
          this.selectedClient=new Client(res);
          this.cd.markForCheck();
          this.inCorrectId=false;
          this.branchStoreService.getBranchByName(res.branch).pipe(take(1)).subscribe(res1=>{
            console.log(res1.bank);
            this.selectedClientsBank=res1.bank;
            this.cd.detectChanges();
          });
//          this.selection="Details";
          this.changeSelection("Details");
          this.loginForm = this.fb.group({ 
            'Id': [, Validators.required],
          });
        }
        else{
          this.inCorrectId=true;
          console.log("Client not found!");
        }
    });
    this.addSubForm=this.fb.group({
      'amount': [, Validators.required]
    })
  }
  ngOnInit() {
  }
  change(){
    let amount= this.addSubForm.controls.amount.value;
    let temp=this.selectedClient.balance;
    this.selectedClient.balance= this.selection=='Withdraw' ? -amount :+ amount ;
    this.clientStoreService.updateClient(this.selectedClient);
    this.selectedClient.balance+=temp;
    //this.addSubForm.controls.amount.value=0;
  }
}
