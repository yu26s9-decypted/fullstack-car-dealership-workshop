import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  imports: [RouterLink, FormsModule],
  templateUrl: './create-account.html',
  styleUrls: ['./create-account.css'],
})
export class CreateAccount {
  countries = ['United States', 'Canada', 'Mexico'];
  selectedCountry = signal('United States');
  isCountryMenuOpen = signal(false);
  selectedNext = signal(false);
  private authService = inject(AuthService)

  email = ''
  password = ''
  firstName = ''
  lastName = ''
  region = ''
  phone = ''
  error = signal('')
  isLoading = signal(false)

  

  toggleCountryMenu() {
    this.isCountryMenuOpen.update((isOpen) => !isOpen);
  }

  selectCountry(country: string) {
    this.selectedCountry.set(country);
    this.isCountryMenuOpen.set(false);
  }

  selectedNextStep() {
      console.log("Selected next")
      this.selectedNext.set(true)
  }

  createUserAccount(){
    this.authService.register({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      region: this.region,
      password: this.password

      
    })
    console.log("create acc called", this.firstName, this.lastName, this.email, this.region, this.password)
    
  }
}
