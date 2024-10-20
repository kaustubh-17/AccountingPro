import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './employee/createEmployee/createEmployee.component';
import { ReadEmployeeComponent } from './employee/readEmployee/readEmployee.component';
import { LoginComponent } from './login/login.component';
import { CanActivateFinanceFn, CanActivateFn, CanActivateHRFn, CanActivateITFn } from './auth.guard';
import { AppComponent } from '../app.component';
import { FinanceComponent } from '../finance/finance.component';
import { SalaryComponent } from '../salary/salary.component';
import { GeneratePayrollComponent } from '../generate-payroll/generate-payroll.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  { path: 'employees', component: EmployeeComponent, canActivate: [CanActivateHRFn] },
  { path: 'employees/create', component: CreateEmployeeComponent, canActivate: [CanActivateHRFn]},
  { path: 'employees/:id', component: ReadEmployeeComponent, canActivate: [CanActivateHRFn] },
  { path: 'finance', component: FinanceComponent, canActivate:[CanActivateFinanceFn] },
  // { path: 'salary', component: SalaryComponent, canActivate:[CanActivateITFn]},
  {path:'uploadpayroll/:id',component:GeneratePayrollComponent},
  { path: 'login', component: LoginComponent }
]
  // { path: 'employees', component: EmployeeComponent },
  // { path: 'employees/create', component: CreateEmployeeComponent },


@NgModule({
  declarations: [
    EmployeeComponent,
    CreateEmployeeComponent,
    ReadEmployeeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports:[EmployeeComponent, RouterModule]
})
export class AdminModule { }
