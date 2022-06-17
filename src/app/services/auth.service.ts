import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Router, CanActivate } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate  {
  constructor(public router: Router, private toast: HotToastService) {}

  canActivate(): boolean {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/admin/auth']);
      this.toast.info('Please login first!', { position: 'top-right' });
      return false;
    }
    return true;
  }

  login(data: any) {
    const { username, password } = data

    if(username == "admin" && password == "admin") {
      this.setSession()

      this.router.navigate(['/admin']);
      this.toast.info('Logging In!', { position: 'top-right' });
    }
    else {
      this.toast.error('Invalid email or password!', { position: 'top-right' });
    }
  }

  setSession() {
    const token = Math.random().toString(36).slice(2, 20)
    const expiresAt = moment().add(7200, 'second');

    localStorage.setItem('token', token);
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');

    this.router.navigate(['/admin/auth']);
  }

  public isLoggedIn(): boolean {
    if(moment().isBefore(this.getExpiration()) == false) this.logout()
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration: any = localStorage.getItem('expiresAt');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
