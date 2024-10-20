import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-small-form',
  templateUrl: './small-form.component.html',
  styleUrls: ['./small-form.component.css']
})
export class SmallFormComponent {

constructor(private http:HttpClient)
{

}

  @Output() closeForm = new EventEmitter<void>();
  selectedFile: File | null = null;
  detail2: string = ''; // Bind to ngModel
  detail3: string = ''; // Bind to ngModel
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('detail2', this.detail2);
    formData.append('detail3', this.detail3);

    // this.http.post<any>('http://localhost:5295/api/YourEndpoint', formData).subscribe(
    //   (response) => {
    //     console.log('Form submitted successfully!', response);
    //     this.close();
    //   },
    //   (error) => {
    //     console.error('Error submitting form:', error);
    //     // Handle error as needed
    //   }
    // );
  }

  close() {
    this.closeForm.emit();
  }
}
