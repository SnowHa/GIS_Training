import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '../../Store/store';
import { Client } from './client-model';
import { ClientService } from './client.service';

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
  public getClientById(id: number){
      this.setState('[clients] LOADING',s => ({ ...s , clientsLoaded: false }));
      return this.clientService.getClientsById(id).pipe(map((res)=>{
                if(res) {
                let b =JSON.parse(res);  
                return new Client(b[0]);
            }
            else{
              return null;
            }
                  }));
    } 
    public loadClientsByBranch(name: string){
      this.setState('[clients] LOADING',s => ({ ...s , clientsLoaded: false }));
      const clients = new Array<Client>();
      console.log(name);
      this.clientService.getClientsByBranch(name).subscribe((res)=>{
        console.log("RES");
        console.log(res);
        if(res){
          console.log("GG");
          for(let b of JSON.parse(res))
          {     
            clients.push(new Client(b));
          }
        }
        this.setState('[clients] LOAD', s=>({ ...s,clients: clients, clientLoaded: true}));
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
