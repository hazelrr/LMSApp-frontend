import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  login:boolean=false;
  isLoggedIn?: Observable<boolean>;
  userDisplayName?: string | null;
  userid:any;

  prepareRoute(outlet:RouterOutlet)
  {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isLoggedIn = this.userService.isLoggedIn;
    this.userid = sessionStorage.getItem('loggedUserId');
    
      this.isLoggedIn = this.userService.isLoggedIn; 
    
    this.userDisplayName = sessionStorage.getItem('loggedUser');
    console.log(this.userDisplayName);
   
  }

  onLogout() {
    sessionStorage.removeItem('loggedUser');
    sessionStorage.removeItem('loggedUserId');
    sessionStorage.clear();
    this.userService.logout();
    alert("See you next time!!");
   
  }
}

