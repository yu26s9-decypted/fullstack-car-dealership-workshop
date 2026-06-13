import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-vehicle-detail',
  imports: [MatProgressSpinnerModule],
  templateUrl: './vehicle-detail.html',
  styleUrl: './vehicle-detail.css',
})


export class VehicleDetail implements OnInit {
  isLoading = signal(true);
  private route = inject(ActivatedRoute)
  private vehicleService = inject(VehicleService);

  vehicle = signal<Vehicle | null>(null);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')
    const model = slug?.split('-')[1]

    if(model) {
      this.vehicleService.getVehicleByModel(model).subscribe({
        next: (vehicles) => {
          this.vehicle.set(vehicles[0] ?? null);
          this.isLoading.set(false)
        }, 
      error: (err: unknown) => console.error(err)
    })
    }
  }
}
