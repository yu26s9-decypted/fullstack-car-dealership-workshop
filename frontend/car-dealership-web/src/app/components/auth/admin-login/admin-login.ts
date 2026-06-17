import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-admin-login',
  imports: [FormsModule],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css'],
})
export class AdminLogin {
  private router = inject(Router)
  private authService = inject(AuthService)
  
  username = '';
  password = '';
  error = signal('')

  login(){
    if(this.authService.isAdmin()) {
      this.router.navigate(['/admin'])
    } else {
      this.error.set(`Missing role permission to access.`)
    }
  }
}
