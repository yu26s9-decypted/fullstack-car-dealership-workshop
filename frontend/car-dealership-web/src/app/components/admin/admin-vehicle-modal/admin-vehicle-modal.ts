import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { VehicleService } from '../../../services/vehicle.service';
import { Vehicle } from '../../../models/vehicle.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-vehicle-modal',
  imports: [FormsModule],
  templateUrl: './admin-vehicle-modal.html',
  styleUrl: './admin-vehicle-modal.css',
})
 export class AdminVehicleModal implements OnInit {
  private vehicleService = inject(VehicleService)
  vehicle = input.required<Vehicle>();
  closeModal = output<void>();
  saved = output<Vehicle>();

  private sanitizer = inject(DomSanitizer);
  safeImageUrl = signal<SafeUrl>('')

  form = {
    make: '',
    model: '',
    year: 0,
    color: '',
    price: 0,
    odometer: 0,
    vehicleType: '',
    description: '',
    imageURL: '',
    bannerUrl: ''
  };

  ngOnInit(): void {
    const v = this.vehicle();
    this.form = {
      make: v.make,
      model: v.model,
      year: v.year,
      color: v.color,
      price: Number(v.price),
      odometer: v.odometer,
      vehicleType: v.vehicleType,
      description: v.description,
      imageURL: v.imageURL,
      bannerUrl: v.bannerUrl
    };
  }


  onClose(){
    this.closeModal.emit();
  }

  onSave(){
    const updated: Vehicle = {
      ...this.vehicle(), ...this.form
    };
    this.vehicleService.updateVehicle(updated).subscribe({
      next: (vehicle) => {
        this.saved.emit(vehicle);
        this.closeModal.emit();
        console.log("Updated: ", vehicle)
      },
      error: (err: unknown) => console.error(err)
    })
  }
  
  



  
}
