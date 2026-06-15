import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-account',
  imports: [RouterLink],
  templateUrl: './create-account.html',
  styleUrls: ['./create-account.css'],
})
export class CreateAccount {
  countries = ['United States', 'Canada', 'Mexico'];
  selectedCountry = signal('United States');
  isCountryMenuOpen = signal(false);

  toggleCountryMenu() {
    this.isCountryMenuOpen.update((isOpen) => !isOpen);
  }

  selectCountry(country: string) {
    this.selectedCountry.set(country);
    this.isCountryMenuOpen.set(false);
  }
}
