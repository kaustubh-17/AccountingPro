import { Component, OnInit, inject } from '@angular/core';
import { LoginService } from '../admin/Services/login.service';
import { Router } from '@angular/router';
import { GetDepartment} from '../admin/auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
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
  
  logout() {
    this.loginService.logout();
    alert("You are logged out now.")
    this.router.navigate(['/login']);
  }
}
