import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { GetDepartment } from '../auth.guard';
import { Employee } from '../Models/employee';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);
  regitserUserForm: FormGroup;
  loginUserForm: FormGroup;
  signIn: boolean = false;

  constructor(private fb: FormBuilder) {
    this.loginUserForm = this.fb.group({
      username: ['',[Validators.required, Validators.minLength(3)]],
      password:['', [Validators.required, Validators.minLength(3)]]
    })
  }
  role: string;
  loginUser() {
    this.loginService.login(this.loginUserForm.value).subscribe(foundUser => {
      if (foundUser) {
        //console.log(foundUser.emp_department);
        if (foundUser.emp_department === 'HR') {
          //console.log("true")
          this.router.navigate(['employees']);
        }
        
      
        else if (foundUser.emp_department === 'IT') this.router.navigate(['dashboard']);
        else if(foundUser.emp_department === 'Finance') this.router.navigate(['expense-tracker/xdashboard']);
      }
      else {alert("Please check your username & password or contact an HR")}
    });
  }
}
