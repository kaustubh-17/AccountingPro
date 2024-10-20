import { Injectable } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  async generatePdf(employeeId: number, details: string): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    page.drawText(`Employee ID: ${employeeId}`, {
      x: 50,
      y: 700,
      size: 20,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Details:\n${details}`, {
      x: 50,
      y: 650,
      size: 15,
      color: rgb(0, 0, 0),
    });

    return pdfDoc.save();
  }
}
