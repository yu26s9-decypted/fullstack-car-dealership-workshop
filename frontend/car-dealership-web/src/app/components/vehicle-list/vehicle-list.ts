import { Component, inject, OnInit, signal } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-vehicle-list',
  imports: [CurrencyPipe],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.css',
})
export class VehicleList implements OnInit{
  private vehicleService = inject(VehicleService);

  vehicles = signal<Vehicle[]>([])

  ngOnInit(): void {
    this.loadVehicle();
  }

  isLoading = signal(true);

  loadVehicle(){
    this.vehicleService.getAllVehicles().subscribe({
      next: (vehicles) => {
        console.log(vehicles)
        this.vehicles.set(vehicles);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error("Something went wrong.", err)
        this.isLoading.set(false);
      }
    })
  }
}
