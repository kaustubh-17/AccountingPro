import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { HeaderComponent } from './header/header.component';
import { FinanceComponent } from './finance/finance.component';
import { SalaryComponent } from './salary/salary.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; 
import { Routes, RouterModule } from '@angular/router'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { PayslipComponent } from './payslip/payslip.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HomeComponent } from './home/home.component';
import { GeneratePayrollComponent } from './generate-payroll/generate-payroll.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { ExpenseListComponent } from './components/expense/expense-list/expense-list.component';
import { ExpenseFormComponent } from './components/expense/expense-form/expense-form.component';
import { CompanyListComponent } from './components/company/company-list/company-list.component';
import { CompanyFormComponent } from './components/company/company-form/company-form.component';
import { ExpenseDashboardComponent } from './components/expense/expense-dashboard/expense-dashboard.component';
import { LeftNavComponent } from './components/shared/left-nav/left-nav.component';
import { TopNavComponent } from './components/shared/top-nav/top-nav.component';
import { ExpenseService } from './services/expense.service';
import { CompanyService } from './services/company.service';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { VendorExpensesComponent } from './components/expense/vendor-expenses/vendor-expenses.component';
import { SmallFormComponent } from './small-form/small-form.component';
import { FooterComponent } from './footer/footer.component';
import { SuccessComponent } from './components/shared/success/success.component';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';

const routes:Routes=[
  {path:'',component:DashboardComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'payslip',component:PayslipComponent},
  {path:'feedback',component:FeedbackComponent},

];

@NgModule({
  declarations: [						
    AppComponent,
    HeaderComponent,
    FinanceComponent,
    SalaryComponent,
    DashboardComponent,
    PayslipComponent,
    FeedbackComponent,
      HomeComponent,
      GeneratePayrollComponent,
      SuccessComponent,
      ConfirmDialogComponent,

      ExpenseListComponent,
      ExpenseFormComponent,
      CompanyListComponent,
      CompanyFormComponent,
      ExpenseDashboardComponent,
      LeftNavComponent,
      TopNavComponent,
      CategoryListComponent,
      CategoryFormComponent,
      VendorExpensesComponent,
      SmallFormComponent,
      FooterComponent
   ],
  imports: [
    BrowserModule,
    AdminModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AppRoutingModule,
    NgSelectModule
  ],
  exports: [RouterModule],
  providers: [ExpenseService, CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
