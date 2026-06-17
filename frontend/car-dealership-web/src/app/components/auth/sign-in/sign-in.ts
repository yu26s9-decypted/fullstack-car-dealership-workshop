import { Component, inject, signal } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css'],
})
export class SignIn {
  private router = inject(Router)
  private authService = inject(AuthService);

  email = '';
  password = '';
  error = signal('')
  isLoading = signal(false);

  login(){
    console.log("login called", this.email, this.password);
    this.isLoading.set(true);
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        console.log("Authed!")

        if(!this.authService.isAdmin()){
          this.router.navigate(['/'])
        } else {
          this.router.navigate(['/admin'])
        }
      },
      error: () => {
        this.error.set(`Invalid account credentials. Try again.`)
        this.isLoading.set(false)
      }
    })
  }
}
