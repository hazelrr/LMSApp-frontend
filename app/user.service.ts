import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';  
import {HttpHeaders} from '@angular/common/http';  
import { from, Observable, of, Subject } from 'rxjs';  
import { Register } from "../app/register";  
import { query } from '@angular/animations';
import { Router } from '@angular/router';
import { Login } from './login';
import { ResetPassword} from './resetpassword';
import { Course } from './course';
import { Technology } from './technology';
import { User } from './user';
import { Icourse } from './icourse';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  Url : string;
  readonly rootUrl = 'https://localhost:44372/api/';  
 // token : string;  
  header : any; 
  activeUser?:Register;
  loggedIn: Subject<boolean> = new Subject<boolean>();
  userId?:any;
  constructor(private https : HttpClient,private router:Router) {   
  
    this.Url = 'https://localhost:44372/api/';  
  
    const headerSettings: {[name: string]: string | string[]; } = {};  
    this.header = new HttpHeaders(headerSettings);  
  }  
  Login(user : Login){  
   // debugger;  
     //var a =this.Url+'login';
     this.loggedIn.next(true);
     const body :Login =user;
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
     return this.https.post<User>(this.rootUrl+'User/'+'Login',body,httpOptions);  
     
  //  return this.http.post<any>(this.Url+'Login',model,{ headers: this.header});  
  }  
   CreateUser(register:Register)  
   {  
     const body:Register =register;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    return this.https.post<Register>(this.rootUrl + 'User/' +'Register', body,httpOptions);  
   } 
   ViewAllCourses()
   {
     var a=this.Url+ 'ViewAllCourses';
     return this.https.get<Course[]>(this.rootUrl + 'Course/'+ 'ViewAllCourses',{responseType:"json"})
   }

   ViewUsers()
   {     
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    return this.https.get<User[]>(this.rootUrl + 'User/'+ 'GetAllUsers',{responseType:"json"})
   }

   AddCourse(course:Icourse)
   {         
     const body:Icourse=course;
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'accept':'application/json'}) };  
     return this.https.post<Icourse>(this.rootUrl + 'Course/' + 'Addcourse', body,httpOptions);
   }

   DeleteCourse(courses:Course)
   {         
     const body:Course=courses;
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'accept':'application/json'}) };  
     return this.https.post<Course>(this.rootUrl + 'Course/' + 'Deletecourse', body,httpOptions);
   }
   ResetPassword(user:ResetPassword)
   {
     var a =this.Url + 'ResetPassword';
     const body :ResetPassword =user;
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
     return this.https.post(this.rootUrl + 'User/' + 'ResetPassword', body, {responseType:"text"}) 
   }   

   GetAllCoursesByUserId(userid:string)
   {   
     
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    let params = new HttpParams().set("userId",userid);
    return this.https.get<Course[]>(this.rootUrl + 'Course/' + 'GetAllCoursesByUserId/' +userid, {responseType:"json"}) 
   }
   
   GetAllCoursesByCourseDuration(techname:string,coursefromrange:number,coursetorange:number)
   {   
     
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };  
    let params1 = new HttpParams().set("techId",techname);
    let params2 = new HttpParams().set("coursefromRange",coursefromrange);
    let params3 = new HttpParams().set("coursetoRange",coursetorange);
    return this.https.get<Course[]>(this.rootUrl + 'Course/' + 'GetAllCoursesByCourseDuration/' +techname+ '/' +coursefromrange+ '/' +coursetorange, {responseType:"json"}) 
   }
   

   GetUserByEmailAddress(emailId:string){
    const headers = new HttpHeaders({
    'Content-Type': 'application/json'
    
  })
    return this.https.get(this.rootUrl+ 'User/'+ 'GetUserbyEmailAddress/'+emailId,{responseType:"json"}).
    subscribe(result=>{this.activeUser = result as User
      ,this.router.navigate(['/Dashboard'])})
      
  }

   get isLoggedIn() {
     //this.http.login()
    this.userId = sessionStorage.getItem('loggedUserId');
    console.log(this.userId);
    //this.isLoggedIn= !(this.isLoggedIn);
     if(this.userId !== '')
     {
      return this.loggedIn.asObservable();
     }
     else 
     {    
     return of(false);
     
     
     
     }

    
}

logout() {
  this.loggedIn.next(false);
  sessionStorage.removeItem('loggedUser');
  sessionStorage.removeItem('loggedUserId');
  sessionStorage.clear();  
  this.router.navigate(['/login']);

}

private handleError(error: Response) {
  console.error(error);
  // return Observable.throw(error.json() || 'Server error');
  return throwError("Server error");
  
}
}