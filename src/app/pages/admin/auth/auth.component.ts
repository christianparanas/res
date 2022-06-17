import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private toast: HotToastService,
    private authService: AuthService,
    public router: Router
  ) {
    this.initializeForm();
  }

  checkIfAuth() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin/']);
    }
  }

  ngOnInit(): void {
    this.checkIfAuth()
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.status == 'INVALID') {
      this.toast.warning('Please fill out the fields.', {
        position: 'top-right',
      });
      return;
    }

    console.log(this.loginForm.value);
    
    this.authService.login(this.loginForm.value);
  }
}
