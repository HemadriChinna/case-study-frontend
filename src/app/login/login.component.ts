import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  responseData : any;
  username : string = "";
  password : string = "";
  apiUrl : string = "";
  role : String = "";
  Token : String = "";
  constructor (private http : HttpClient,private router : Router) {}
  ngOnInit(): void {
    if (localStorage.getItem("Token") != null && localStorage.getItem("Email")!= null ) {
      this.router.navigate(["/user-dashboard"]);
    }
  }
  fetchData() {
    if (this.username == "" || this.password == "") {
      if (this.password == "" && this.username == "") {
        alert("Email and password are required.");
      } else if (this.username == "") {
        alert("Username cannot be empty.");
      } else if (this.password == "") {
        alert("Password cannot be empty.");
      }
      return;
    }
    this.apiUrl = "http://localhost:8080/email/"+this.username;
    const httpOptions = {
      headers : new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
      })
    };
    this.http.get(this.apiUrl, httpOptions).subscribe(
      (data) => {
        this.responseData = data;
          this.role = this.responseData.designation;
          this.role = this.role.toLowerCase();
          if (this.role == "developer") {
            this.router.navigate(["/user-dashboard"]);
            this.Token = btoa(this.username + ":" + this.password);
            localStorage.setItem("Token",btoa(this.username+":"+this.password));
            localStorage.setItem("Email",this.username);
          }
          else if (this.role == "manager") {
            this.router.navigate(["/user-dashboard"]);
            this.Token = btoa(this.username + ":" + this.password);
            localStorage.setItem("Token",btoa(this.username+":"+this.password));
            localStorage.setItem("Email",this.username);
          }
          else if (this.role == "admin") {
            this.router.navigate(["/user-dashboard"]);
            this.Token = btoa(this.username + ":" + this.password);
            localStorage.setItem("Token",btoa(this.username+":"+this.password));
            localStorage.setItem("Email",this.username);
          }
      },
      (error) => {
        console.error('HTTP Error:', error);
        alert("Please enter correct credentials");
      }
    );    
  }
}