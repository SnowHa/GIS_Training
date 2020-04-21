import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Client} from './client-model'
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientUrl : string = 'http://localhost/BIS_API/api/Client';
  headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
  //options = new RequestOptions({ headers: this.headers, withCredentials: true }); // Create a request option
     
  constructor(private http: HttpClient) { }
  
  getClients() : Observable<any>{
    return this.http.get<any>(`${this.clientUrl}/`);
  }
  getClientsById(id: number) : Observable<any>{
    return this.http.get<any>(`${this.clientUrl}/Select/${id}`);
  }
  getClientsByBranch(branch:string) : Observable<any>{
     return this.http.get<any>(`${this.clientUrl}/SelectUsingBranch/${branch}`);
   }
  addClient(newClient : Client) {
    //bank/Create/name/balance
  let bodyString=`/${newClient.firstName}/${newClient.lastName}/${newClient.dateOfBirth}/${newClient.balance}/${newClient.branch}/${newClient.type}/${newClient.id}`;
  return this.http.post(this.clientUrl+ "/Create"+bodyString,"") // ...using post request
          ;
  }
  updateClient(client:Client){
    return this.addClient(client);
  }
}
