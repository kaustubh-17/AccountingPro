import { Component, OnInit, inject } from '@angular/core';
import { Employee } from '../../Models/employee'; 
import { EmployeeService } from '../../Services/employee.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-createEmployee',
  templateUrl: './createEmployee.component.html',
  styleUrls: ['./createEmployee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeService: EmployeeService = inject(EmployeeService);
  router: Router = inject(Router);
  employees:Employee[]=[];
  unExists:boolean;
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder, private http:HttpClient) {
    this.registrationForm = this.fb.group({
      emp_id: [],
      emp_name: ['', [Validators.required, Validators.minLength(3)]],
      emp_username: ['', [Validators.required, Validators.minLength(3)]],
      emp_email: ['', [Validators.required, Validators.email]],
      emp_password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
      emp_phone: ['', [Validators.required, Validators.minLength(10) ,Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      emp_gender:['', Validators.required],
      emp_department: ['', Validators.required],
      emp_project: ['', Validators.required],
      emp_role: ['', Validators.required],
      emp_salary: ['', Validators.required],
      emp_doj: [],
      emp_experience: ['', Validators.required],
      emp_isAdmin:[]
    })
  }  

ngOnInit(): void {
  this.employeeService.getAllEmployees().subscribe(data => {
    this.employees = data;
  })
}

usernameExists(event: KeyboardEvent) {
  const inputElement = event.target as HTMLInputElement;
    const username = inputElement.value;
  if( this.employees.some(user => user.emp_username === username))
    {
      this.unExists = true
    }
  else
  {
    this.unExists = false
  }
}

 
  onSubmit() {
    // console.log(this.registrationForm.value);
    let emp: Employee = this.registrationForm.value;
    //console.log(emp);
    delete emp.emp_id; 
    emp.emp_isAdmin = false;
  emp.emp_doj = "02-03-2019";
    this.employeeService.saveEmployee(emp).subscribe(data => {
      // let url = '/employees/' + data.emp_id;
       this.router.navigate(['employees']);
      //console.log(emp);
      //console.log(data);

    });
  }
}
