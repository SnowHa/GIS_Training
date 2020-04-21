import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '../../Store/store';
import { BankService } from './bank.service';
import { Bank } from './bank-model';



export class BankData {
    banks: Bank[];
    selectedBank: Bank;
    banksLoaded: boolean;
}

const INITIAL_BANK_DATA: BankData = {
    banks: new Array<Bank>(),
    selectedBank: new Bank(),
    banksLoaded: false
};

@Injectable({
    providedIn: 'root'
  })
export class BankStoreService extends Store<BankData> {
    constructor(private bankService: BankService) {
        super("banks",INITIAL_BANK_DATA);
    }
    public loadBanks() {
          this.setState('[banks] LOADING',s => ({ ...s , banksLoaded: false }));
          const banks = new Array<Bank>();
          this.bankService.getBanks().subscribe((res)=>{
            for(let b of JSON.parse(res))
            {
                banks.push(new Bank(b));
            }
            this.setState('[banks] ADD SELECTED',s => ({ ...s , selectedBank: banks[0] }));
            this.updateState('[banks] LOADED', { banks: banks, banksLoaded: true});
        });
      }
    
    public addBank(bank: Bank) {
        let newBanks = [...this.getSnapshot().banks, bank];
        ////this.updateState('[Customers] ADD',{customers: newCustomers})
        this.bankService.addBank(bank).toPromise().then(
          (res)=>{
          this.setState('[banks] ADD BANK',s => ({ ...s , banks: newBanks }))
        });
      }
  public updateSelected(name :string){
    let bank= this.getSnapshot().banks.filter(function(x){
      return x.name==name;
    })[0]
    ;
    this.setState('[banks] ADD SELECTED',s => ({ ...s , selectedBank: bank }));
  }
  public getSelected():Observable<Bank>{
    if(this.getSnapshot().selectedBank==null){
      let b=this.getSnapshot().banks[0];
      this.setState('[banks] ADD SELECTED',s => ({ ...s , selectedBank: b }));
    }
    return this.select(state => state.selectedBank);
  }
  getBanks(loadFirst:boolean =true): Observable<Array<Bank>> {
    if(loadFirst){
      this.loadBanks();
    }  
    return this.select(state => state.banks);
  }
  isLoading(): Observable<boolean> {
    return this.select(state => state.banksLoaded);
  }
  public DoesBankExist(name:string) :Promise<Boolean>{
    return new Promise(resolve =>
      {
        var sol=false;
        this.bankService.getBankByName(name).subscribe((res)=>{
              if(res) {
              let b =JSON.parse(res);  
              sol=true;
          }
        },
        error => {
         console.log("ERROR IN FIND BANK")
        },
        ()=> {
          resolve(sol);
        });    
        });
  }
}
