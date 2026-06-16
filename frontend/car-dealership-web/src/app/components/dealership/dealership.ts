import { Component, inject, OnInit, signal } from '@angular/core';
import { DealershipService } from '../../services/dealership.service';
import { Dealership } from '../../models/dealership.model';

@Component({
  selector: 'app-dealership',
  imports: [],
  templateUrl: './dealership.html',
  styleUrl: './dealership.css',
})
export class DealershipPage implements OnInit{
  private dealershipService = inject(DealershipService)
  private dealershipImages = ['/asset/AndaraE1.png', '/asset/AndaraS1.png', '/asset/E1.png'];
  dealership = signal<Dealership[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadDealerships();
  }
  
  

  loadDealerships(){
    this.dealershipService.getAllDealership().subscribe({
      next: (dealerships: Dealership[]) => {
        this.dealership.set(dealerships)
        this.isLoading.set(false)
      }, error: (error) => {
        console.error(error)
        this.isLoading.set(false)
        
      
      }
    })
  }

  getPhoneHref(phone: string): string {
    return `tel:${phone.replace(/[^\d+]/g, '')}`;
  }

  getDirectionsUrl(address: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }

  getDealershipImage(index: number): string {
    return this.dealershipImages[index % this.dealershipImages.length];
  }

}
