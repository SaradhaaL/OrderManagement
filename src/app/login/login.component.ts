import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('userDetails'))?.RememberMe) {
      this.router.navigateByUrl('users');
    } else {
      this.loginForm = this.fb.group({
        Username:  ['', [Validators.required]],
        EmailID: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.minLength(8)]],
        RememberMe: [false],
      });
    }
    
  }
  onFormSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      let { Password, ...rest } = this.loginForm.value;
      localStorage.setItem('userDetails',JSON.stringify({...rest}));
      this.router.navigateByUrl('users');
    }
  }
  //FormControls
  get login() {
    return this.loginForm.controls;
  }
}
