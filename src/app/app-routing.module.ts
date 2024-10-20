import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './components/expense/expense-list/expense-list.component';
import { ExpenseFormComponent } from './components/expense/expense-form/expense-form.component';
import { CompanyListComponent } from './components/company/company-list/company-list.component';
import { CompanyFormComponent } from './components/company/company-form/company-form.component';
import { ExpenseDashboardComponent } from './components/expense/expense-dashboard/expense-dashboard.component';
import { LeftNavComponent } from './components/shared/left-nav/left-nav.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { VendorExpensesComponent } from './components/expense/vendor-expenses/vendor-expenses.component';

const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    {
        path: 'expense-tracker',
        component: LeftNavComponent,
        children: [
            { path: '', redirectTo: 'xdashboard', pathMatch: 'full' },
            { path: 'xdashboard', component: ExpenseDashboardComponent },
            { path: 'expenses', component: ExpenseListComponent },
            { path: 'vendor-expenses', component: VendorExpensesComponent },
            { path: 'create-expense', component: ExpenseFormComponent },
            { path: 'edit-expense/:id', component: ExpenseFormComponent },
            { path: 'companies', component: CompanyListComponent },
            { path: 'create-company', component: CompanyFormComponent },
            { path: 'edit-company/:id', component: CompanyFormComponent },
            { path: 'categories', component: CategoryListComponent },
            { path: 'create-category', component: CategoryFormComponent },
            { path: 'edit-category/:id', component: CategoryFormComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
