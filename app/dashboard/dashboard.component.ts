import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params} from '@angular/router';
import { Course } from '../course';
import { UserService } from '../user.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Icourse } from '../icourse';
import { Icourseduration } from '../icourseduration';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  courseList?:Course[];
  usercourseList?:Course[];
  techname?:any;
  coursedurationfrom?:any;
  coursedurationto?:any;
  form1: any;
  courses?:Icourseduration;
  userid:any;
  userDisplayName:any;


  constructor(private service:UserService , private formBuilder: FormBuilder,private router:Router,private route:ActivatedRoute) {
    //this.userid =this.route.snapshot.params.id
   }

  ngOnInit(){
    this.form1 = new FormGroup({
      techname: new FormControl(),
      coursedurationfrom: new FormControl(),
      coursedurationto: new FormControl()
    
      
    
  });
  this.userDisplayName = sessionStorage.getItem('loggedUser');
  this.userid = sessionStorage.getItem('loggedUserId');
  console.log(this.userid)

  this.service.GetAllCoursesByUserId(this.userid).subscribe((response) =>
  {
    
     this.usercourseList = response;        
     console.log(this.usercourseList)
  });

  this.service.activeUser == true

    
  }
  get f() { return this.form1.controls; }

  onFormSubmit() {
  const course = this.form1.value;    
  console.log(course)
  this.Getdetails(course);  
 }  
 Getdetails(courses:Icourseduration){
   console.log(courses.techname,courses.coursedurationfrom)
  
  this.service.GetAllCoursesByCourseDuration(courses.techname,courses.coursedurationfrom,courses.coursedurationto).subscribe((response) =>
  {
    console.log(courses.techname,courses.coursedurationfrom,courses.coursedurationto);
     this.courseList = response;
     
  });

}
}
