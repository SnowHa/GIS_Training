import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Bank} from './bank-model'
@Injectable({
  providedIn: 'root'
})
export class BankService {
  bankUrl : string = 'http://localhost/BIS_API/api/Bank/';
  headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
  //options = new RequestOptions({ headers: this.headers, withCredentials: true }); // Create a request option
     
  constructor(private http: HttpClient) { }
  getBanks() : Observable<any>{
     return this.http.get<any>(`${this.bankUrl}`);
  
   /*.subscribe(data => { 
          var data = JSON.parse(data);
          console.log(data);
          this.loading = false;
     });
     return data;*/
   }
  addBank(newBank: Bank) {
      //bank/Create/name/balance
    let bodyString=`/${newBank.name}/${newBank.total_balance}`;
    return this.http.post(this.bankUrl+ "Create"+bodyString,"") // ...using post request
            ; }
  getBankByName(name: string) : Observable<any>{
              return this.http.get<any>(`${this.bankUrl}/Select/${name}`);
            }
}
