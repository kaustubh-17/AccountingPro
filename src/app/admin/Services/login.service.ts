import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginUser } from '../Models/loginUser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employee } from '../Models/employee';
import { GetDepartment, GetUser } from '../auth.guard';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 // url: string = "http://localhost:3000/users";
  isLogged: boolean = false;
  constructor(private http: HttpClient) {
   
    //console.log(GetDepartment());
    //localStorage.setItem('currentUser', null);

    if(GetUser()==null) 
      {
          //localStorage.clear();
        this.isLogged = false;
      }
      else
      {
        this.isLogged = true;
      }
    
    }
  

  login(user: LoginUser): Observable<Employee|null>{ 
    const url = `http://localhost:5295/api/employees`;
    const params = new HttpParams()
    .set('username', user.username)
    .set('password', user.password);
    return this.http.get<Employee[]>(url, {params}).pipe(
      map((employees:Employee[]) => {
     
      
      if (employees && employees.length > 0) {
        // Succeeded - console.log(user)
        const foundUser = employees.find(emp => emp.emp_username === user.username);
        if(foundUser!=null)
          localStorage.setItem('currentUser', JSON.stringify(foundUser));
        //console.log(localStorage.getItem('currentUser'));
        this.isLogged = true;
        return foundUser;
      }
      else{
       // console.log("null");
       localStorage.setItem('currentUser', null);
        this.isLogged = false;
        return null;
      }
    
    }));
  }

  logout() {
    localStorage.clear();
    this.isLogged = false;

  }
  isAuthenticated() : boolean {
    return this.isLogged;
  }
}
