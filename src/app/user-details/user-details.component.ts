import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit{
logout() {
  localStorage.clear();
  this.router.navigate(["/"]);
}
  Token : string;
  apiUrl : string = "";
  email : string = "";
  responseData : any;
  name : string = "";
  ngOnInit(): void {
    this.fetchData();
    if (localStorage.getItem("Token") == null ||localStorage.getItem("Email") == null) {
      this.router.navigate(["/"]);
    }
  }
  constructor (private http : HttpClient,private router : Router) {}
  fetchData() {
    this.email = localStorage.getItem("Email");
    this.apiUrl = "http://localhost:8080/email/"+this.email;
    this.Token = localStorage.getItem("Token");
    const httpOptions = {
      headers : new HttpHeaders({
        'Authorization': 'Basic ' + this.Token
      })
    };
    this.http.get(this.apiUrl,httpOptions).subscribe(
      (data) => {
        this.responseData = data;
        this.name = this.responseData.name;
        console.log(this.responseData);
        
      }
    )
  }
  clickLogo() {
    this.router.navigate(["/user-dashboard"]);
  }
  saveEmployee() {
    const employeeData = {
      employeeId: (<HTMLInputElement>document.getElementById("employeeId")).value,
      name: (<HTMLInputElement>document.getElementById("name")).value,
      phoneNumber: (<HTMLInputElement>document.getElementById("phoneNumber")).value,
      designation: (<HTMLInputElement>document.getElementById("designation")).value,
      email: (<HTMLInputElement>document.getElementById("email")).value,
      password: (<HTMLInputElement>document.getElementById("password")).value
    };
    const httpOptions = {
      headers : new HttpHeaders({
        'Authorization': 'Basic ' + this.Token
      })
    };
    this.http.post<any>('http://localhost:8080/saveEmployees', [employeeData],httpOptions)
      .subscribe(
        response => {
          console.log('Employee added successfully:', response);
        },
        error => {
          console.error('Error adding employee:', error);
        }
      );
  }
  addProject() {
    const projectData = {
      projectId: (<HTMLInputElement>document.getElementById("projectId")).value,
      projectName: (<HTMLInputElement>document.getElementById("projectName")).value
    };
    const httpOptions = {
      headers : new HttpHeaders({
        'Authorization': 'Basic ' + this.Token
      })
    };
    this.http.post<any>('http://localhost:8080/saveProjects', [projectData],httpOptions)
      .subscribe(
        response => {
          console.log('Project added successfully:', response);
        },
        error => {
          console.error('Error adding project:', error);
        }
      );
  }
}
