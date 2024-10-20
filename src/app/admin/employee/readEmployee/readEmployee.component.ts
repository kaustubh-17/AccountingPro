import { Component, DoCheck, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../Models/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-readEmployee',
  templateUrl: './readEmployee.component.html',
  styleUrls: ['./readEmployee.component.css']
})
export class ReadEmployeeComponent implements OnInit{
  employeeService: EmployeeService = inject(EmployeeService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  updateEmployeeForm: FormGroup;
  id: any;
  edit: boolean = true;
  employee: Employee;
  encryptedPassword: string;
  ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.employeeService.getEmployeeById(this.id).subscribe(employee => {
        this.employee = employee;
        this.encryptedPassword = '*'.repeat(this.employee.emp_password.length);
      });
    });

   

  }

 

  constructor(private fb:FormBuilder) {
    this.updateEmployeeForm = this.fb.group({
      emp_id: [],
      emp_name: ['', [Validators.required, Validators.minLength(3)]],
      emp_username: ['', [Validators.required, Validators.minLength(3)]],
      emp_email: ['', [Validators.required, Validators.email]],
      emp_password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
      emp_phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
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
  
  editEmployee() {
    this.edit = !this.edit;
    this.updateEmployeeForm.patchValue(this.employee);
    //console.log(this.updateEmployeeForm)
  }
  emp: Employee = new Employee();
  
  updateEmployee() {
    // this.emp.emp_id = this.id;
    this.emp.emp_name = this.updateEmployeeForm.value.emp_name;
    this.emp.emp_username = this.updateEmployeeForm.value.emp_username;
    this.emp.emp_email = this.updateEmployeeForm.value.emp_email;
    this.emp.emp_password = this.updateEmployeeForm.value.emp_password;
    this.emp.emp_phone = this.updateEmployeeForm.value.emp_phone
    this.emp.emp_gender = this.updateEmployeeForm.value.emp_gender;
    this.emp.emp_department = this.updateEmployeeForm.value.emp_department;
    this.emp.emp_project = this.updateEmployeeForm.value.emp_project;
    this.emp.emp_role = this.updateEmployeeForm.value.emp_role;
    this.emp.emp_salary = this.updateEmployeeForm.value.emp_salary;
    this.emp.emp_doj = this.updateEmployeeForm.value.emp_doj;
    this.emp.emp_experience = this.updateEmployeeForm.value.emp_experience;
    this.emp.emp_isAdmin = this.updateEmployeeForm.value.emp_isAdmin;

    //console.log(this.id);
    console.log(this.emp);
    const confirmation = confirm("Do you really wish to update?")
    if(confirmation)
      {
      this.employeeService.updateEmployee(this.id, this.emp)
      .subscribe(updatedEmployee => {
        console.log(updatedEmployee);
        this.employee = updatedEmployee;
        this.router.navigate(['/employees']);
      },
        (error) => {
          //console.log(error);
      });
    this.edit = !this.edit;
    }
  
  }
  

  deleteEmployee(id: number) { 
    //console.log("delete " + id);
    this.employeeService.deleteEmployee(id).subscribe(deleteSuccessful => {
      if (deleteSuccessful) {
        alert('Employee terminated successfully')
        this.router.navigate(['/employees']);
      }
    });
  }
}
