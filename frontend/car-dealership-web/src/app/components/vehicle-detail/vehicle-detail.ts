import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CurrencyPipe } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FinanceEstimate } from '../../models/orderestimate.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-vehicle-detail',
  imports: [MatProgressSpinnerModule, CurrencyPipe, FormsModule],
  templateUrl: './vehicle-detail.html',
  styleUrl: './vehicle-detail.css',
})


export class VehicleDetail implements OnInit {
  isLoading = signal(true);
  private route = inject(ActivatedRoute)
  private vehicleService = inject(VehicleService);
  vehicle = signal<Vehicle | null>(null);

  private sanitizer = inject(DomSanitizer);
  safeImageUrl = signal<SafeUrl>('')

  // Order Estimate

  selectedPaymentType = signal<'finance' | 'cash'>(`finance`)
  downPayment = signal<number>(0);
  termMonth = signal<number>(84);
  isTermMenuOpen = signal(false);
  termOptions = [36, 48, 60, 72, 84];
  estimatePayment = signal<FinanceEstimate | null>(null);
  isCalculating = signal(false);

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


  getEstimate(){
    const vehicle = this.vehicle();
    if(!vehicle) return;

    this.isCalculating.set(true)
  
    const req = {
      vehicleId: vehicle.id,
      paymentType: this.selectedPaymentType(),
      downPayment: this.downPayment(),
      termMonths:  this.termMonth(),
      monthlyPayment: 0,
      totalPayment: 0
    }

    this.vehicleService.getOrderEstimate(req).subscribe({
      next: (result) => {
        this.estimatePayment.set(result);
        this.isCalculating.set(false)
          console.log("Res: ", result)
      }, error: (err: unknown) => {
        console.error(err)
        this.isCalculating.set(false)
      }
    });
  }

  selectPaymentType(type: 'finance'|'cash') {
    this.selectedPaymentType.set(type);
    this.estimatePayment.set(null);
    console.log("Selected: ", type)
  }

  toggleTermMenu() {
    this.isTermMenuOpen.update((isOpen) => !isOpen);
  }

  selectTermMonth(term: number) {
    this.termMonth.set(term);
    this.isTermMenuOpen.set(false);
    this.getEstimate();
  }
}
