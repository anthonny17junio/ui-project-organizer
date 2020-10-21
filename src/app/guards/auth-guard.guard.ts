import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private authService:AuthServiceService, private router: Router){

  }

  canActivate(){
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/projects']);
    }
    return !this.authService.isLoggedIn();
  }
  
}
