import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../services/company.service';
import { Company } from '../../../Models/company.model';
import { SuccessComponent } from '../../shared/success/success.component';
@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  @ViewChild('success') success: SuccessComponent;
  companyForm: FormGroup;
  companyId: number;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      compName: ['', Validators.required],
      dateOfVenture: ['', Validators.required],
      domain: ['', Validators.required]
    });

    this.companyId = +this.route.snapshot.paramMap.get('id');
    if (this.companyId) {
      this.loadCompany();
    }
  }

  loadCompany(): void {
    this.companyService.getCompany(this.companyId).subscribe(company => {
      this.companyForm.patchValue(company);
    });
  }

  saveCompany(): void {
    const company: Company = this.companyForm.value;
    if (this.companyId) {
      company.id = this.companyId;
      this.companyService.updateCompany(this.companyId, company).subscribe(() => {
        this.success.show();
        this.success.modalClosed.subscribe(() => {
          this.router.navigate(['/expense-tracker/companies']);
        });
      });
    } else {
      this.companyService.createCompany(company).subscribe(() => {
        this.success.show();
        this.success.modalClosed.subscribe(() => {
          this.router.navigate(['/expense-tracker/companies']);
        });
      });
    }
  }
}
