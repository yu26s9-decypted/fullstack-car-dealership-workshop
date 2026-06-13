import { Component } from '@angular/core';
import { VehicleList } from "./components/vehicle-list/vehicle-list";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [VehicleList, RouterLink, RouterOutlet]
})
export class App {
  
}
