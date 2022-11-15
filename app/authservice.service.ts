import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Register } from './register';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userid?:any;
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login() {
    this.userid = sessionStorage.getItem('loggedUserId');
    console.log(this.userid);    
      if(this.userid !==null)
      {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
    else{
      this.loggedIn.next(false);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
  
}