import { Component, OnInit } from '@angular/core';
import { EmployeePayslipService } from '../services/employee-payslip.service';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit {
  employeeId :number; // Example employee ID
  payslips: string[] = [];

  constructor(private payslipService: EmployeePayslipService) { }

  ngOnInit(): void {
//Succeeded - console.log(localStorage.getItem('currentUser'));
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
this.employeeId= currentUser.emp_id;
   // this.employeeId = localStorage.getItem('currentUser')
    this.loadPayslips();
  }

  loadPayslips(): void {
    this.payslipService.getPayslips(this.employeeId).subscribe(payslips => {
      this.payslips = payslips;

      const monthOrder = [
        "Jan", "Feb", "Mar", "April", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    this.payslips.sort((a, b) => {
        const monthA = a.split(' ')[0];
        const monthB = b.split(' ')[0];
        return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
    });

    });
  }

  downloadPayslip(fileName: string): void {
    this.payslipService.downloadPayslip(this.employeeId, fileName).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.payslipService.uploadPayslip(this.employeeId, file).subscribe(() => {
        this.loadPayslips();
      });
    }
  }
}
