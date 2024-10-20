import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import * as feather from 'feather-icons';
import { Feedback } from './Models/feedbacks';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit{
employeeId:number
feedback:string
myfeedback:Feedback
  constructor(private http: HttpClient) {
    this.myfeedback = {} as Feedback;
  }
 
  ngOnInit() {
  feather.replace();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  this.employeeId= currentUser.emp_id;
  }

  submitFeedback()
  {
    //console.log(this.employeeId);
    alert("Your feedback was submitted successfully!");
    this.myfeedback.empid = this.employeeId;
    this.myfeedback.feedback = this.feedback;
     console.log(this.myfeedback);
    this.http.post<Feedback>('http://localhost:5295/api/Feedback/postfeedbacks',this.myfeedback).subscribe(data=>
      console.log(data)
    );
  }

}
