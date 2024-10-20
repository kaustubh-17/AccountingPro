import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from "../Models/employee";

@Injectable({providedIn: 'root'})
export class EmployeeService{
    // url: string = 'http://localhost:3000/employees'; //json-server link
    url: string = 'http://localhost:5295/api/employees';
    http: HttpClient = inject(HttpClient);

    getAllEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.url);
    }
    
    saveEmployee(emp: Employee): Observable<Employee> {
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
       // emp.emp_id=23;
        emp.emp_isAdmin=false;
        emp.emp_doj="02-03-2019";
        return this.http.post<Employee>(this.url, emp, { headers: headers });

    }

    getEmployeeById(id : number) : Observable<Employee> {
        return this.http.get<Employee>(this.url + "/" + id);
    }

    updateEmployee(id: number, employee: Employee): Observable<Employee>{
        //const headers = new HttpHeaders({'Content-Type': 'application/json'}); 
        //console.log(employee);
       
        console.log(`${this.url}/${id}`)
        employee.emp_id=0;
        return this.http.put<Employee>(`${this.url}/${id}`, employee);
    }

    deleteEmployee(emp_id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.url+"/"+emp_id);
    }
}