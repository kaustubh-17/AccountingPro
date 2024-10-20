import { Component, inject } from '@angular/core';
import { LoginService } from './admin/Services/login.service';
import { Router } from '@angular/router';
import { GetDepartment } from './admin/auth.guard';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AccountingPro';
  
 

  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);
  dep: any = GetDepartment();
  ngOnInit() {
  }

  ngDoCheck() {
    if(localStorage.getItem('currentUser')!=null)  
    this.dep = GetDepartment();
    else
    this.dep = null;
  }

  formVisible = false;

  openForm() {
    this.formVisible = true;
  }
 
  
  logout() {
    if(confirm("Are you sure to log out?"))
      {
        this.loginService.logout();
        alert("You are logged out now.")
        this.router.navigate(['/login']);
      }
   
  }
}
