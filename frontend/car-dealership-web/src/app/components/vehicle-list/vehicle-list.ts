import { Component, inject, OnInit, signal } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-vehicle-list',
  imports: [],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.css',
})
export class VehicleList implements OnInit{
  private vehicleService = inject(VehicleService);

  vehicles = signal<Vehicle[]>([])

  ngOnInit(): void {
    this.loadVehicle();
  }

  loadVehicle(){
    this.vehicleService.getAllVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles.set(vehicles);
      },
      error: (err) => {
        console.log("Something went wrong.", err)
      }
    })
  }
}
