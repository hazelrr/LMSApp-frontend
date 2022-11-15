import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from '../course';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courseList?:Course[];

  constructor(private service:UserService ,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {

    this.service.ViewAllCourses().subscribe((response) =>
  {
    
     this.courseList = response;        
     console.log(this.courseList)
  });
    
  }

}
