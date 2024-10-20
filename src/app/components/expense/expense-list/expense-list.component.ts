import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../../../services/expense.service';
import { Expense } from '../../../Models/expense.model';
import { FormControl } from '@angular/forms';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  vendorExpanse: Expense[] = [];
  categoryFilter = new FormControl('');
  selectedExpenseId: number | null = null;
  @ViewChild('confirmDialog') confirmDialog: ConfirmDialogComponent;
  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.loadExpenses();
    this.categoryFilter.valueChanges.subscribe(value => {
      this.filterExpenses(value);
    });
  }
  openConfirmDialog(expenseId: number): void {
    this.selectedExpenseId = expenseId;
    this.confirmDialog.show();
  }
  onConfirm(result: boolean): void {
    if (result && this.selectedExpenseId !== null) {
      this.deleteExpense(this.selectedExpenseId);
    }
  }
  filterExpenses(value: string): void {
    if (!value) {
      this.filteredExpenses = this.expenses;
    } else {
      this.filteredExpenses = this.expenses.filter(expense =>
        expense.category?.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe((data) => {
      this.expenses = data.filter(expense => expense.category?.toLowerCase() !== 'vendor');
      this.filteredExpenses = this.expenses;
    });
  }

  loadVendorExpenses(): void {
    this.expenseService.getExpenses().subscribe((data) => {
      this.vendorExpanse = data.filter(expense => expense.category?.toLowerCase() === 'vendor');
    });
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.expenses = this.expenses.filter(expense => expense.id !== id);
      this.filteredExpenses = this.filteredExpenses.filter(expense => expense.id !== id);
    });
  }
}
