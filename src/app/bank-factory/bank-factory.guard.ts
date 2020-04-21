 /* tslint:disble max-line-length */ 
import { Injectable } from '@angular/core'; 
import {  CanActivate,  ActivatedRouteSnapshot,  RouterStateSnapshot, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/Services/auth.service';
@Injectable() 
 export class GISGuard implements CanActivate { 
      constructor(private authService: AuthService, private router: Router) {} 
      canActivate(  
          next: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
             const isLoggedIn = this.authService.isLoggedIn();
             console.log('canActivate', isLoggedIn);
              if(isLoggedIn){
                  return true;
              }
              return false
            }
}
