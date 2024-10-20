import { Component, OnInit } from '@angular/core';
import { LogininfoService } from '../services/logininfo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employee = {
    name: 'Alice Smith',
    position: 'Marketing Specialist',
    department: 'Marketing'
  };

  constructor(private lgn: LogininfoService) { }
  userinfo:any;

  ngOnInit(): void {
    //console.log(localStorage.getItem('currentitem'));
    this.lgn.setUserInfo();
    //this.lgn.setUserInfo( ['4th april 1998','26 Yr','Canada','California, USA','info@domain.com','820-885-3321','skype.0404','Available','A Lead UX & UI designer based in Canada','I design and develop services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.']);
    this.userinfo = this.lgn.getUserInfo();
  }

  signOut() {
    // Implement sign-out functionality here
    console.log('Signing out...');
  }
}
