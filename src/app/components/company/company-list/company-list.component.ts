import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../Models/company.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  selectedCompanyId: number | null = null;
  @ViewChild('confirmDialog') confirmDialog: ConfirmDialogComponent;
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.loadCompanies();
  }
  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(data => {
      console.log(data);
      this.companies = data;
      console.log(this.companies)
    });
  }
  openConfirmDialog(companyId: number): void {
    this.selectedCompanyId = companyId;
    this.confirmDialog.show();
  }
  onConfirm(result: boolean): void {
    if (result && this.selectedCompanyId !== null) {
      this.deleteCompany(this.selectedCompanyId);
    }
  }
  deleteCompany(id: number): void {
    this.companyService.deleteCompany(id).subscribe(() => {
      this.companies = this.companies.filter(company => company.id !== id);
    });
  }
}
