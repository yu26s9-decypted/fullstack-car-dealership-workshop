import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../../services/vehicle.service';
import { Vehicle } from '../../../models/vehicle.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CurrencyPipe } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { OrderModal } from '../../orders/order-modal/order-modal';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-vehicle-detail',
  imports: [MatProgressSpinnerModule, CurrencyPipe, OrderModal],
  templateUrl: './vehicle-detail.html',
  styleUrl: './vehicle-detail.css',
})


export class VehicleDetail implements OnInit {
  isLoading = signal(true);
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private vehicleService = inject(VehicleService);
  private authService = inject(AuthService);
  vehicle = signal<Vehicle | null>(null);

  private sanitizer = inject(DomSanitizer);
  safeImageUrl = signal<SafeUrl>('')

 isOrderModalOpen = signal(false)

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')
    const model = slug?.split('-')[1]

    if(model) {
      this.vehicleService.getVehicleByModel(model).subscribe({
        next: (vehicles) => {
          const v = vehicles[0] ?? null;
          this.vehicle.set(vehicles[0] ?? null);
          this.isLoading.set(false)

          if(v?.imageURL){
            this.safeImageUrl.set(this.sanitizer.bypassSecurityTrustUrl(v.imageURL))
          }
        }, 
      error: (err: unknown) => console.error(err)
    })
    }
  }

  openOrderModal(){
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.isOrderModalOpen.set(true)
    console.log('Opening order modal for: ', this.vehicle)
  }

  closeModal(){
    this.isOrderModalOpen.set(false)
  }
}
