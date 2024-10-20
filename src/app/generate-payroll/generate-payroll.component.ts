import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import { PdfService } from '../services/pdfservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../admin/Models/employee';
import { EmployeeService } from '../admin/Services/employee.service';

@Component({
  selector: 'app-generate-payroll',
  templateUrl: './generate-payroll.component.html',
  styleUrls: ['./generate-payroll.component.css']
})
export class GeneratePayrollComponent implements OnInit {


  router: Router = inject(Router);
  employeeService: EmployeeService = inject(EmployeeService);
  id: any
  activatedRoute: ActivatedRoute = inject(ActivatedRoute)

  employee: Employee;
  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.employeeService.getEmployeeById(this.id).subscribe(employee => {
        this.employee = employee;
      });
    });
  }

  employeeId: number;
  details: string = '';
  empinfo:any[]=[];
  docname: string = '';

  constructor(private http: HttpClient, private pdfService: PdfService) { }

  async onSubmit() {
   
    this.empinfo.push(`${this.docname} Payslip`);
    this.empinfo.push("_________________________________________________");
    this.empinfo.push(`Employee Name: ${this.employee.emp_name}`);
    this.empinfo.push(`Employee Email: ${this.employee.emp_email}`);
    this.empinfo.push(`Employee Phone: ${this.employee.emp_phone}`);
    this.empinfo.push(`Employee Department: ${this.employee.emp_department}`);
    this.empinfo.push(this.details);
    this.empinfo.push("_________________________________________________");
    const empinfoString = this.empinfo.join('\n');

    this.empinfo.push(JSON.stringify(this.employee));
    
    //console.log(JSON.stringify(this.employee))

    this.empinfo.push(this.details);
    // Generate PDF logic (replace with your PDF generation code)
    this.employeeId = this.employee.emp_id;
    const pdfBytes = await this.pdfService.generatePdf(this.employeeId, empinfoString);

    const formData = new FormData();
    formData.append('file', new Blob([pdfBytes], { type: 'application/pdf' }), `${this.docname}.pdf`);
   
    this.http.post<any>(`http://localhost:5295/api/EmployeePayslip/${this.employeeId}`, formData).subscribe(
      response => {
        // console.log('File uploaded successfully:', response.filePath);
        alert("Payslip uploaded for the employee");
        this.router.navigate(['/employees']);
        // Handle success (e.g., show success message)
      },
      error => {
        console.error('Error uploading file:', error);
        // Handle error (e.g., show error message)
      }
    );
  }

}
