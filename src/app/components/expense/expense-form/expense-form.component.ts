import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../../services/expense.service';
import { CompanyService } from '../../../services/company.service';
import { CategoryService } from 'src/app/services/category.service';
import { Expense } from '../../../Models/expense.model';
import { Company } from '../../../Models/company.model';
import { Category } from 'src/app/Models/category.model';
import { SuccessComponent } from '../../shared/success/success.component';
import { dateRangeValidator } from '../../Validators/dateRangeValidator'; // Adjust the path as needed

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit, AfterViewInit {
  @ViewChild('success') success: SuccessComponent;
  expenseForm: FormGroup;
  companies: Company[] = [];
  categories: Category[] = [];
  expenseId: number;

  constructor(
    private renderer: Renderer2, private el: ElementRef,
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private companyService: CompanyService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      companyName: [''],
      contractStart: ['', Validators.required],
      contractEnd: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      mode: ['', Validators.required]
    }, { validators: dateRangeValidator('contractStart', 'contractEnd') }
    );

    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
    });
    this.categoryService.getCategories().subscribe(data => {
      console.log(data)
      this.categories = data;
    });

    this.expenseId = +this.route.snapshot.paramMap.get('id');
    if (this.expenseId) {
      this.loadExpense();
    }
    this.expenseForm.get('category')?.valueChanges.subscribe(selectedCategory => {
      if (selectedCategory !== 'Vendor') {
        this.expenseForm.get('companyName')?.reset();
      }
      if (selectedCategory === 'Vendor') {
        this.expenseForm.get('companyName').setValidators([Validators.required]);
      } else {
        this.expenseForm.get('companyName').clearValidators();
      }
    });
  }

  loadExpense(): void {
    this.expenseService.getExpense(this.expenseId).subscribe(expense => {
      // Format dates to 'yyyy-MM-dd'
      const formattedStart = expense.contractStart ? new Date(expense.contractStart).toISOString().split('T')[0] : '';
      const formattedEnd = expense.contractEnd ? new Date(expense.contractEnd).toISOString().split('T')[0] : '';

      this.expenseForm.patchValue({
        ...expense,
        contractStart: formattedStart,
        contractEnd: formattedEnd
      });
    });
  }

  saveExpense(): void {
    const expense: Expense = this.expenseForm.value;
    if (this.expenseId) {
      expense.id = this.expenseId;
      this.expenseService.updateExpense(this.expenseId, expense).subscribe(() => {
        this.success.show();
        this.success.modalClosed.subscribe(() => {
          this.router.navigate(['/expense-tracker/expenses']);
        });
      });
    } else {
      this.expenseService.createExpense(expense).subscribe(() => {
        this.success.show();
        this.success.modalClosed.subscribe(() => {
          this.router.navigate(['/expense-tracker/expenses']);
        });
      });
    }
  }

  ngAfterViewInit() {
    const ngSelectContainers: NodeListOf<Element> = this.el.nativeElement.querySelectorAll('.ng-select-container');
    ngSelectContainers.forEach(container => {
      this.renderer.setStyle(container, 'color', '#333');
      this.renderer.setStyle(container, 'background-color', '#f6f6f6');
      this.renderer.setStyle(container, 'border', 'none');
      this.renderer.setStyle(container, 'min-height', '36px');
      this.renderer.setStyle(container, 'align-items', 'center');
      this.renderer.setStyle(container, 'margin', '0');
    });
  }
}
