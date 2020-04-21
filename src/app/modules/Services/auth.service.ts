import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  DomainUrl : string = 'http://localhost/BIS_API/api/Domain';
  constructor(private http: HttpClient) { }
  isLoggedIn() : Promise<Observable<boolean>>{
     return new Promise(resolve =>
        {
            let r: any;
            this.http.get<any>(`${this.DomainUrl}`).subscribe( (res)=>{
                
                console.log(res);
                r=res;
                if(res!="ACCESS DENIED"){
                  console.log("User was confirmed as GIS");
                }
                else{
                  console.log("User is not GIS");
                  r=false;
                }
              },
            error => {
                console.log("ERROR IN GUARD")
            },
            ()=> {
                resolve(r);
            })

        }) 
   /*.subscribe(data => { 
          var data = JSON.parse(data);
          console.log(data);
          this.loading = false;
     });
     return data;*/
   }
}
