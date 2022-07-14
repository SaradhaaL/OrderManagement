import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
})
export class UserLayoutComponent implements OnInit {
  profileDetails;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.profileDetails = JSON.parse(localStorage.getItem('userDetails'));
  }
  onLogout() {
    localStorage.removeItem('userDetails');
    this.router.navigateByUrl('login');
  }
}
