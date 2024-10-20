import { Component, ElementRef, Renderer2, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  @ViewChild('successModal', { static: true }) successModal: ElementRef;
  @Output() modalClosed = new EventEmitter<void>();

  constructor(private renderer: Renderer2) { }

  show(): void {
    const modalElement = this.successModal.nativeElement;
    this.renderer.addClass(modalElement, 'show');
    this.renderer.setStyle(modalElement, 'display', 'block');
    this.renderer.setStyle(modalElement, 'opacity', '1');
  }

  hide(): void {
    const modalElement = this.successModal.nativeElement;
    this.renderer.removeClass(modalElement, 'show');
    this.renderer.setStyle(modalElement, 'display', 'none');
    this.renderer.setStyle(modalElement, 'opacity', '0');
    this.modalClosed.emit(); // Emit event when modal is closed
  }
}
