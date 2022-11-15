import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
  {path:'', redirectTo: 'Home',pathMatch: 'full' },    
  
  {path:'Home', component:HomeComponent},
  {path:'Login', component:LoginComponent},
  {path:'Register', component:RegisterComponent},
  {path:'Dashboard', component:DashboardComponent},
  {path:'ResetPassword', component:ResetpasswordComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }