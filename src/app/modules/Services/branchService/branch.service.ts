import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Branch} from './branch-model'
@Injectable({
  providedIn: 'root'
})
export class BranchService {
  branchUrl : string = 'http://localhost/BIS_API/api/Branch/';
  headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
  //options = new RequestOptions({ headers: this.headers, withCredentials: true }); // Create a request option
     
  constructor(private http: HttpClient) { }
  
  getBranches() : Observable<any>{
    return this.http.get<any>(`${this.branchUrl}`);
  }
  getBranchByName(name: string) : Observable<any>{
    return this.http.get<any>(`${this.branchUrl}Select/${name}`);
  }
  getBranchByBank(bank:string) : Observable<any>{
     return this.http.get<any>(`${this.branchUrl}SelectUsingBank/${bank}`);
   }
  addBranch(newBranch: Branch) {
    //bank/Create/name/balance
  let bodyString=`/${newBranch.name}/${newBranch.balance}/${newBranch.x}/${newBranch.y}/${newBranch.bank}`;
  return this.http.post(this.branchUrl+ "Create"+bodyString,"") // ...using post request
          ;
  }

}
