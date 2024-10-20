import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../../services/expense.service';

import { Expense } from '../../../Models/expense.model';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-vendor-expenses',
  templateUrl: './vendor-expenses.component.html',
  styleUrls: ['./vendor-expenses.component.css']
})
export class VendorExpensesComponent implements OnInit {
  vendorExpanse: Expense[] = [];
  categoryFilter = new FormControl('');

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.loadVendorExpenses();
  }

  loadVendorExpenses(): void {
    this.expenseService.getExpenses().subscribe((data) => {
      this.vendorExpanse = data.filter(expense => expense.category?.toLowerCase() === 'vendor');
    });
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.vendorExpanse = this.vendorExpanse.filter(expense => expense.id !== id);
    });
  }
}
