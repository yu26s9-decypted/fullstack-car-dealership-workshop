import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import Intercom, { show } from '@intercom/messenger-js-sdk';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  private isIntercomInitialized = false;
  isMobileMenuOpen = signal(false);

  ngOnInit(): void {
    this.initializeIntercom();
  }

  openSupport(): void {
    this.initializeIntercom();

    if (isPlatformBrowser(this.platformId)) {
      show();
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((isOpen) => !isOpen);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  get firstName(): string {
    const token = this.authService.getToken();

    if(!token) return ''
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('payload', payload)
    return payload.firstName;
    
  }

  private initializeIntercom(): void {
    if (!isPlatformBrowser(this.platformId) || this.isIntercomInitialized) {
      return;
    }

    Intercom({
      app_id: 'u0sc7fpx',
      hide_default_launcher: true,
    });
    this.isIntercomInitialized = true;
  }
}
