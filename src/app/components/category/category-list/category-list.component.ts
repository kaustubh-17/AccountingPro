import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../Models/category.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number | null = null;

  @ViewChild('confirmDialog') confirmDialog: ConfirmDialogComponent;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
  openConfirmDialog(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.confirmDialog.show();
  }

  onConfirm(result: boolean): void {
    if (result && this.selectedCategoryId !== null) {
      this.deleteCategory(this.selectedCategoryId);
    }
  }
  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(category => category.id !== id);
    });
  }
}
