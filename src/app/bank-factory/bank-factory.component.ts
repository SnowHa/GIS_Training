import { Component, OnInit, ChangeDetectionStrategy, OnChanges, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Bank } from '../modules/Services/bankService/bank-model';
import { BankStoreService } from '../modules/Services/bankService/bank.store.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-bank-factory',
  templateUrl: './bank-factory.component.html',
  styleUrls: ['./bank-factory.component.css'],  
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class BankFactoryComponent implements OnInit {
  myForm: FormGroup; 
  errors: Array<string>;
  complete: boolean=false;
  content: Array<string>= new Array<string>();
  constructor(private bankStoreService: BankStoreService, fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.myForm = fb.group(new Bank());
   }
  SubmitBank(){
    this.errors= new Array<string>();
    if(this.myForm.value.name=="" ){
      this.errors.push("fill it all");
      this.cd.detectChanges();
      return;
    }
    let newBank= new Bank({Name: this.myForm.controls['name'].value,
         Total_balance: this.myForm.controls['total_balance'].value});
    this.bankStoreService.DoesBankExist(newBank.name).toPromise().then((res)=>
    {
      console.log(res);
      if(res){
        this.errors.push("the name already exists");
        this.cd.detectChanges();

      }
      else{
        console.log("SDSD");
        console.log(newBank);
        this.bankStoreService.addBank(newBank);
        this.complete=true;
        this.content.push(`Welcome ${newBank.name}!`);
        this.content.push('the GIS family will treat you well');
        this.content.push('to create your first branch, click on `Bank owner` on the menu.')
        this.cd.detectChanges();
      }
    }); //observable.pipe(take(1)).subscribe(()=>{...})
  }
  ngOnInit() {
  }

}
