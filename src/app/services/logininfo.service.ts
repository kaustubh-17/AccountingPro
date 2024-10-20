import { Injectable } from '@angular/core';
import { GetUser } from '../admin/auth.guard';

@Injectable({
    providedIn:'root'
})
export class LogininfoService {

    private userInfo: any;

    constructor() { }
  
    setUserInfo() {
      this.userInfo = GetUser();
      //console.log(this.userInfo)
    }
  
    getUserInfo() {
      return this.userInfo;
    }

}
