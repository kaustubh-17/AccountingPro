import { Component, DoCheck, OnInit, inject } from '@angular/core';
import { Employee } from '../Models/employee';
import { EmployeeService } from '../Services/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  employeeService: EmployeeService = inject(EmployeeService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  loginService: LoginService = inject(LoginService);
  router: Router = inject(Router);

  employeeList: Employee[] = [];
  registrationForm: FormGroup;

  ngOnInit() {
    // console.log(localStorage.getItem('currentUser'));
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employeeList = employees;
    })
  }



  filtername() {
    this.employeeList.sort((a, b) => a.emp_name.localeCompare(b.emp_name));
  }

  filterdept() {
    this.employeeList.sort((a, b) => a.emp_department.localeCompare(b.emp_department));
  }

  filterproject() {
    this.employeeList.sort((a, b) => a.emp_project.localeCompare(b.emp_project));
  }
  bulkupdateemployees()
  {
    
  }


  deleteEmployee(id: number) {
    //console.log("delete " + id);
    var confirmation = confirm("Do you really wish to terminate employee?");
    //console.log(confirmation);

    if (confirmation) {
      this.employeeService.deleteEmployee(id).subscribe(employeeDeleted => {
        if (employeeDeleted) {
          alert('Employee terminated successfully');
          this.employeeService.getAllEmployees().subscribe(employees => {
            this.employeeList = employees;
          })
        }
      });
    }
    else {
      alert("Operation cancelled");
    }
  }

}
