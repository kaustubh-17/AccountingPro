import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import { Expense } from 'src/app/Models/expense.model';
import { Chart, registerables, ChartConfiguration, ChartTypeRegistry } from 'chart.js';
import { HttpClient } from '@angular/common/http';

Chart.register(...registerables);

interface DepartmentExpense {
  department: string;
  expense: number;
}

interface CategoryExpense {
  category: string;
  amount: number;
}

interface MonthlyExpense {
  month: string;
  amount: number;
}

@Component({
  selector: 'app-expense-dashboard',
  templateUrl: './expense-dashboard.component.html',
  styleUrls: ['./expense-dashboard.component.css']
})
export class ExpenseDashboardComponent implements OnInit {
  totalPayrollExpenses: number = 0;
  departmentExpenses: DepartmentExpense[] = [];
  expensesByCategory: CategoryExpense[] = [];
  monthlyExpenses: MonthlyExpense[] = [];
  availableYears: number[] = [];
  selectedYear: number;
  monthlyExpenseChart: Chart;
  categoryExpenseChart: Chart<"pie", number[], string>;

  monthsOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(private http: HttpClient, private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.getPayrollExpenses();
    this.getDepartmentExpenses();
    //this.getExpensesByCategory();
    this.getAvailableYears();
  }

  getPayrollExpenses(): void {
    this.http.get('http://localhost:5295/api/employees').subscribe((data: any) => {
      this.totalPayrollExpenses = data.reduce((sum: number, employee: any) => sum + Number(employee.emp_salary), 0);
    });
  }

  getDepartmentExpenses(): void {
    this.http.get('http://localhost:5295/api/employees').subscribe((data: any) => {
      const ctx = document.getElementById('barGraph2') as HTMLCanvasElement;
      const expenses: { [key: string]: number } = {};
      data.forEach((employee: any) => {
        expenses[employee.emp_department] = (expenses[employee.emp_department] || 0) + employee.emp_salary;
      });

      const sortedKeys = Object.keys(expenses).sort();
      const sortedExpenses: { [key: string]: number } = {};
      sortedKeys.forEach(key => {
        sortedExpenses[key] = expenses[key];
      });

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(sortedExpenses),
          datasets: [{
            label: 'Department Expenses',
            data: Object.values(sortedExpenses),
            backgroundColor: '#af5d5d',
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  getExpensesByCategory(year: number): void {
    this.expenseService.getExpenses().subscribe((data: Expense[]) => {
      const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
      const categoryData: { [key: string]: number } = {};

      data.forEach(expense => {
        const date = new Date(expense.contractStart);
        if (date.getFullYear() === year) {
          categoryData[expense.category] = (categoryData[expense.category] || 0) + expense.amount;
        }
      });
      if (this.categoryExpenseChart) {
        this.categoryExpenseChart.destroy();
      }
      this.categoryExpenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(categoryData),
          datasets: [{
            data: Object.values(categoryData),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#00AB41', '#FF7F00', '#556b2f']
          }]
        }
      });
    });
  }

  getAvailableYears(): void {
    this.expenseService.getExpenses().subscribe((data: Expense[]) => {
      const years = new Set<number>();
      data.forEach(expense => {
        const year = new Date(expense.contractStart).getFullYear();
        years.add(year);
      });
      this.availableYears = Array.from(years).sort((a, b) => b - a);
      this.selectedYear = this.availableYears[0];
      this.getMonthlyExpenses(this.selectedYear);
      this.getExpensesByCategory(this.selectedYear)
    });
  }

  onYearChangeInPie(event: any): void {
    this.selectedYear = +event.target.value;
    this.getExpensesByCategory(this.selectedYear);
  }
  onYearChangeInBar(event: any): void {
    this.selectedYear = +event.target.value;
    this.getMonthlyExpenses(this.selectedYear);
  }

  getMonthlyExpenses(year: number): void {
    this.expenseService.getExpenses().subscribe((data: Expense[]) => {
      const ctx = document.getElementById('barGraph') as HTMLCanvasElement;
      const monthlyData: { [key: string]: number } = {};
      data.forEach(expense => {
        const date = new Date(expense.contractStart);
        if (date.getFullYear() === year) {
          const month = date.getMonth() + 1;
          const monthName = this.getMonthName(month);
          monthlyData[monthName] = (monthlyData[monthName] || 0) + expense.amount;
        }
      });

      const sortedKeys = this.monthsOrder.filter(month => month in monthlyData);
      const sortedMonthlyData: { [key: string]: number } = {};
      sortedKeys.forEach(key => {
        sortedMonthlyData[key] = monthlyData[key];
      });
      if (this.monthlyExpenseChart) {
        this.monthlyExpenseChart.destroy();
      }

      this.monthlyExpenseChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(sortedMonthlyData),
          datasets: [{
            label: 'Expenses',
            data: Object.values(sortedMonthlyData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    });
  }

  getMonthName(monthNumber: number): string {
    return this.monthsOrder[monthNumber - 1];
  }
}
