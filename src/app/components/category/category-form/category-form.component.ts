import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../Models/category.model';
import { SuccessComponent } from '../../shared/success/success.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @ViewChild('success') success: SuccessComponent;
  categoryForm: FormGroup;
  categoryId: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.categoryId = +this.route.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.loadCategory();
    }
  }

  loadCategory(): void {
    this.categoryService.getCategory(this.categoryId).subscribe(category => {
      this.categoryForm.patchValue(category);
    });
  }

  saveCategory(): void {
    const category: Category = this.categoryForm.value;
    if (this.categoryId) {
      category.id = this.categoryId;
      this.categoryService.updateCategory(this.categoryId, category).subscribe(() => {
        this.success.show();
        this.success.modalClosed.subscribe(() => {
          this.router.navigate(['/expense-tracker/categories']);
        });
      });
    } else {
      this.categoryService.createCategory(category).subscribe(() => {
        this.success.show();
        this.success.modalClosed.subscribe(() => {
          this.router.navigate(['/expense-tracker/categories']);
        });
      });
    }
  }
}
