import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css'],
})
export class AdminLogin {
  private router = inject(Router)
  
  username = '';
  password = '';
  error = signal('')

  login(){
    if(this.username === "admin" && this.password === "andaraproject202") {
      localStorage.setItem('admin_token', 'true');
      this.router.navigate(['/admin'])
    } else {
      this.error.set(`Invalid credential. Please try again.`)
    }
  }
}
