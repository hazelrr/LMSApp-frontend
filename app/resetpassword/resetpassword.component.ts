import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../register';
import { ResetPassword } from '../resetpassword';
import { UserService } from '../user.service';
import { PasswordMatch } from '../validator/password-match.validator';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  changePasswordForm: any;
  user:any;
  loading = false;
  submitted = false;
  data = false;    
   
  message?:string;  
  error: any;

  constructor( private formBuilder: FormBuilder,
    private router: Router,    
    private userService: UserService) { }

  ngOnInit()  {
    this.changePasswordForm = this.formBuilder.group({      
      emailId:['',[Validators.required,Validators.email]],       
      oldPassword: ['', [Validators.required, Validators.minLength(6),Validators.pattern]],
      newPassword: ['', [Validators.required, Validators.minLength(6),Validators.pattern]],
      confirmPassword: ['', Validators.required]
  },
      {
        validator: PasswordMatch('newPassword', 'confirmPassword')
      
    
  });
  }
  get f() { return this.changePasswordForm.controls; }

  onFormSubmit()    
  {   
    this.submitted = true;

          // stop here if form is invalid
          if (this.changePasswordForm.invalid) {
              return;
          }
    
          this.loading = true; 
    const user = this.changePasswordForm.value;    
    this.ChangePassword(user);    
  }    
  ChangePassword(user:ResetPassword)    
  {    
  this.userService.ResetPassword(user).subscribe(    
    ()=>    
    {    
      this.data = true;    
      this.message = 'Password changed Successfully'; 
      this.changePasswordForm.reset(); 
      alert('SUCCESS!! .Password changed successfully. :-)');
      this.router.navigate(['/login'])  
      
      
    },
    error => {
                          this.error = error;
                          this.loading = false;
            });    
      
}    


}