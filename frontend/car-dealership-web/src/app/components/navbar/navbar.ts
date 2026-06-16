import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  authService = inject(AuthService);

  get firstName(): string {
    const token = this.authService.getToken();

    if(!token) return ''
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('payload', payload)
    return payload.firstName;
    
  }
}
