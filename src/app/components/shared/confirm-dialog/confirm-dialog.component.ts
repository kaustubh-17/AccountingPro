import { Component, EventEmitter, Output, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  @Output() confirm = new EventEmitter<boolean>();
  @ViewChild('confirmDialog', { static: true }) confirmDialog: ElementRef;

  constructor(private renderer: Renderer2) { }

  show(): void {
    this.renderer.addClass(this.confirmDialog.nativeElement, 'show');
    this.renderer.setStyle(this.confirmDialog.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.confirmDialog.nativeElement, 'opacity', '1');
  }

  hide(): void {
    this.renderer.removeClass(this.confirmDialog.nativeElement, 'show');
    this.renderer.setStyle(this.confirmDialog.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.confirmDialog.nativeElement, 'opacity', '0');
  }

  onNoClick(): void {
    this.confirm.emit(false);
    this.hide();
  }

  onYesClick(): void {
    this.confirm.emit(true);
    this.hide();
  }
}
