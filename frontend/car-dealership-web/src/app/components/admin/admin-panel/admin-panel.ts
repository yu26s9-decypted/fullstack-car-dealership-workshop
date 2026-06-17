import { Component, inject, OnInit, signal } from '@angular/core';
import { Vehicle } from '../../../models/vehicle.model';
import { VehicleService } from '../../../services/vehicle.service';
import { CurrencyPipe } from '@angular/common';
import { AdminVehicleModal } from "../admin-vehicle-modal/admin-vehicle-modal";
@Component({
  selector: 'app-admin-panel',
  imports: [CurrencyPipe, AdminVehicleModal],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css'],
})
export class AdminPanel implements OnInit {
  private vehicleService = inject(VehicleService)
  vehicles = signal<Vehicle[]>([])
  isLoading = signal(true);
  selectedVehicle = signal<Vehicle | null>(null);

  
  ngOnInit(): void {
    this.loadVehicle();
  }

  loadVehicle(){
    this.vehicleService.getAllVehicles().subscribe({
      next: (vehicles: Vehicle[]) => {
        this.vehicles.set(vehicles);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error("Something went wrong.", err)
        this.isLoading.set(false);
      }
    })
  }

  openModal(vehicle: Vehicle){
    this.selectedVehicle.set(vehicle);
    console.log('Selected vehicle:', vehicle);
  }

  closeModal(){
    this.selectedVehicle.set(null);
  }
  
}
