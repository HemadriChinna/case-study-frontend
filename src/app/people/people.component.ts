import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent implements OnInit{
logout() {
  localStorage.clear();
  this.router.navigate(["/"]);
}
  constructor(private router : Router) {}
  ngOnInit(): void {
    if (localStorage.getItem("Token") == null || localStorage.getItem("Email") == null) {
      this.router.navigate(["/"]);
    }
  }
  clickLogo() {
    this.router.navigate(["/user-dashboard"]);
  }
}
