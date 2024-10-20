import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeePayslipService {

  private baseUrl = 'http://localhost:5295/api/EmployeePayslip'; // Adjust based on your API URL

  constructor(private http: HttpClient) { }

  uploadPayslip(employeeId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/${employeeId}`, formData);
  }

  getPayslips(employeeId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/${employeeId}`);
  }

  downloadPayslip(employeeId: number, fileName: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${employeeId}/${fileName}`, { responseType: 'blob' });
  }

}
