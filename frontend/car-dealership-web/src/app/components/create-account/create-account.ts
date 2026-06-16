import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { BidiModule } from "@angular/cdk/bidi";


@Component({
  selector: 'app-create-account',
  imports: [RouterLink, FormsModule, BidiModule],
  templateUrl: './create-account.html',
  styleUrls: ['./create-account.css'],
})
export class CreateAccount {
  countries = ['United States', 'Canada', 'Mexico'];
  selectedCountry = signal('United States');
  isCountryMenuOpen = signal(false);
  selectedNext = signal(false);
  router = inject(Router)
  private authService = inject(AuthService)

  email = ''
  password = ''
  firstName = ''
  lastName = ''
  region = 'United States'
  phone = ''
  error = signal('')
  isLoading = signal(false)

  

  toggleCountryMenu() {
    this.isCountryMenuOpen.update((isOpen) => !isOpen);
  }

  selectCountry(country: string) {
    this.selectedCountry.set(country);
    this.region = country;
    this.isCountryMenuOpen.set(false);
  }

  selectedNextStep() {
      console.log("Selected next")
      this.selectedNext.set(true)
  }

  createUserAccount(){
    this.isLoading.set(true)
    const registerRequest = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      password: this.password,
      region: this.region,
    };

  this.authService.register(registerRequest).subscribe({
    
    next: (res) => {
      this.authService.saveToken(res.token)
      this.router.navigate(['/'])
    },
    error: () => {
      this.error.set("Failed to create account.")
      this.isLoading.set(false)
    }
    })
  }
}
