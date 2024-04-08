import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.css'
})
export class LeavesComponent implements OnInit{
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
