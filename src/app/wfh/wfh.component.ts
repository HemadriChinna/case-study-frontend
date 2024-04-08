import { Time } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-wfh',
  templateUrl: './wfh.component.html',
  styleUrl: './wfh.component.css'
})
export class WFHComponent implements OnInit{
  email: string = "";
  apiUrl : string = "";
  Token : string = "";
  responseData : any = "";
  startdate : Date ;
  enddate : Date;
  starttime : Time;
  reason : string = "";
  employeeId : number;
  urlforid : string = "";
  responsedataforid : any;
  role : string = "";
  time : Time;
  numberOfDays: number;
  apifortasks : string;
  tasks : any;
  taskslength : number;
  id : number;
  currentdate :string = new Date().toISOString().split('T')[0];
  ngOnInit(): void {
    if (localStorage.getItem("Token") == null || localStorage.getItem("Email") == null) {
      this.router.navigate(["/"]);
    }
    this.fetchWFH();
  }
  isStartDatePassed(startDate : string) : boolean{
    const start = new Date(startDate);
    const currentDate = new Date();
    return start<currentDate;
  }
  fetchWFHTasks() {
    const httpOptions = {
      headers : new HttpHeaders({
        'Authorization': 'Basic ' + this.Token
      })
    };
    this.http.get("http://localhost:8080/getWorkFromTasks/",httpOptions).subscribe(
    )
  }
  fetchWFH() {
    this.email = localStorage.getItem("Email");
    this.apiUrl = "http://localhost:8080/getWorkFromHomeByEmail/"+this.email;
    this.urlforid = "http://localhost:8080/email/"+this.email;
    this.Token = localStorage.getItem("Token");
    const httpOptions = {
      headers : new HttpHeaders({
        'Authorization': 'Basic ' + this.Token
      })
    };
    this.http.get(this.urlforid,httpOptions).subscribe(
      (data) => {
        this.responsedataforid = data;
        console.log(this.responsedataforid);
        this.role = this.responsedataforid.designation;
        this.role = this.role.toLowerCase();
          this.http.get(this.apiUrl,httpOptions).subscribe(
            (data) => {
              this.responseData = data;
              console.log("Checking",this.responseData);
              console.log(this.role);
            }
          )
        }
    )
}
  logout() {
  localStorage.clear();
  this.router.navigate(["/"]);
}
cancelWFH(itemId : number) {
  const httpOptions = {
    headers : new HttpHeaders({
      'Authorization': 'Basic ' + this.Token
    })
  };
  this.http.delete('http://localhost:8080/deleteWFH/'+itemId,httpOptions).subscribe(
    (response) => {console.log("data deleted successfully",response);
    this.fetchWFH();
    },
    (error) => {
      console.error('Error occurred while deleting data:', error);
    }
  );
}
  constructor(private router : Router,private http : HttpClient) {}
  clickLogo() {
    this.router.navigate(["/user-dashboard"]);
  }
  saveTask(task: any) {
    const httpOptions = {
        headers: new HttpHeaders({
            'Authorization': 'Basic ' + this.Token
        })
    };
    const taskapi = "http://localhost:8080/saveWorkFromTask/" + task.id;
    this.http.put(taskapi, task, httpOptions).subscribe(
        (response) => {
            console.log("Task saved successfully", response);
        },
        (error) => {
            console.error('Error saving task:', error);
        }
    );
}
  saveWFH() {
      this.employeeId = this.responsedataforid.employeeId;
      let workFromHomeData = {
        employeeId: this.responsedataforid.employeeId,
        startDate: this.startdate,
        endDate : this.enddate,
        reason: this.reason,
        email: this.email
      };
      if (this.startdate == null || this.enddate == null || this.reason === '') {
        if (this.startdate == null && this.enddate == null && this.reason === '') {
          alert("please fill all the fields");
          return;
        }
        else if (this.startdate == null && this.enddate == null) {
          alert("please fill startdate and enddate");
          return;
        }
        else if (this.startdate == null && this.reason == null) {
          alert("please fill startdate and reason");
          return;
        }
        else if (this.reason == null && this.enddate == null) {
          alert("please fill reason and enddate");
          return;
        }
        else if(this.startdate == null) {
          alert("please fill startdate");
          return;
        }
        else if (this.enddate == null) {
          alert("please fill enddate");
          return;
        }
        else if (this.reason === '') {
          alert("please fill the reason");
          return;
        }
      }
      const httpOptions = {
        headers : new HttpHeaders({
          'Authorization': 'Basic ' + this.Token
        })
      };
      this.http.post<any>('http://localhost:8080/saveWormFromHomes',[workFromHomeData],httpOptions)
      .subscribe(response => {
        console.log('Data sent successfully:', response);
        this.id = response[0].id;
        this.http.get<Array<Date>>('http://localhost:8080/calculateDates/'+this.startdate+'/'+this.enddate+'/'+this.id,httpOptions).subscribe(
          (response) => {
            this.tasks = response;
          },
          error => {
            console.error("Error while tasks",error);
          }
        )
        this.fetchWFH();
      }, 
      error => {
        console.error('Error occurred while sending data:', error);
      });
  }
}