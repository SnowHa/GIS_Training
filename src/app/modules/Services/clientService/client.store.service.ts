import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '../../Store/store';
import { Client } from './client-model';
import { ClientService } from './client.service';
import { promise } from 'protractor';

export class ClientData {
    clients: Client[];
    currentClient: Client;
    currentBranch :string;
    clientLoaded: boolean;
}

const INITIAL_CLIENT_DATA: ClientData = {
    clients: new Array<Client>(),
    currentClient: new Client(),
    currentBranch : "",
    clientLoaded: false
};

@Injectable({
    providedIn: 'root'
  })
export class ClientStoreService extends Store<ClientData> {
  constructor(private clientService: ClientService) {
    super("clients",INITIAL_CLIENT_DATA);
  }
  getClientsObservable(): Observable<Client[]> {
        return this.select(state => state.clients);
  }
  public getClientById(id: number) :Promise<Client>{
      this.setState('[clients] LOADING',s => ({ ...s , clientsLoaded: false }));
      return new Promise(resolve =>
        {
          var client = new Client();
          this.clientService.getClientsById(id).subscribe((res)=>{
                if(res) {
                let b =JSON.parse(res);  
                client=new Client(b[0]);
            }
            else{
              client=null;
            }
          },
          error => {
           console.log("ERROR IN FIND CLIENT")
          },
          ()=> {
        
            resolve(client);
          });    
          });
    }
    public loadClientsByBranch(name: string) : Promise<Array<Client>>{
        this.setState('[clients] LOADING',s => ({ ...s , clientsLoaded: false }));
        return new Promise(resolve =>
          {
            const clients = new Array<Client>();
            this.clientService.getClientsByBranch(name).subscribe((res)=>{
                if(res) {
                  for(let b of JSON.parse(res))
                  {     
                    clients.push(new Client(b));
                  }
                }
            },
            error => {
             console.log("ERROR IN GETTING CLIENT BY BRANCH")
            },
            ()=> {
              this.updateState('[clients] LOAD', { clients: clients, clientLoaded: true});
              resolve(clients);
            });    
            });
    }
    public isLoading(): Observable<boolean> {
      return this.select(state => state.clientLoaded);
    }
    public addClient(client: Client) {
        let newClientes = [...this.getSnapshot().clients, client];
        this.clientService.addClient(client).toPromise().then(
          (res)=>{
            this.setState('[clients] ADD',s => ({ ...s , clients: newClientes }))
          });
      }
    public updateClient(client: Client){
      this.clientService.updateClient(client).toPromise();
     
    }
}
