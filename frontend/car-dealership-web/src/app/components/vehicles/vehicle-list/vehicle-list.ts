import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { VehicleService } from '../../../services/vehicle.service';
import { Vehicle } from '../../../models/vehicle.model';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-vehicle-list',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.css',
})
export class VehicleList implements OnInit{
  private vehicleService = inject(VehicleService);
  @ViewChild('vehicleScroller') private vehicleScroller?: ElementRef<HTMLElement>;
  private vehicleScrollAnimation?: number;
  private vehicleScrollTarget = 0;

  vehicles = signal<Vehicle[]>([])

  ngOnInit(): void {
    this.loadVehicle();
  }

  isLoading = signal(true);

  scrollVehicles(direction: 'previous' | 'next') {
    const scroller = this.vehicleScroller?.nativeElement;

    if (!scroller) {
      return;
    }

    const scrollStep = this.getVehicleCardScrollStep();
    const nextScrollLeft = scroller.scrollLeft + (direction === 'next' ? scrollStep : -scrollStep);

    this.smoothScrollVehiclesTo(nextScrollLeft);
  }

  private smoothScrollVehiclesTo(target: number) {
    const scroller = this.vehicleScroller?.nativeElement;

    if (!scroller) {
      return;
    }

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    this.vehicleScrollTarget = Math.max(0, Math.min(target, maxScrollLeft));

    if (!this.vehicleScrollAnimation) {
      this.vehicleScrollAnimation = requestAnimationFrame(() => this.animateVehicleScroll());
    }
  }

  private animateVehicleScroll() {
    const scroller = this.vehicleScroller?.nativeElement;

    if (!scroller) {
      this.vehicleScrollAnimation = undefined;
      return;
    }

    const distance = this.vehicleScrollTarget - scroller.scrollLeft;

    if (Math.abs(distance) < 0.75) {
      scroller.scrollLeft = this.vehicleScrollTarget;
      this.vehicleScrollAnimation = undefined;
      return;
    }

    scroller.scrollLeft += distance * 0.16;
    this.vehicleScrollAnimation = requestAnimationFrame(() => this.animateVehicleScroll());
  }

  private getVehicleCardScrollStep() {
    const scroller = this.vehicleScroller?.nativeElement;

    if (!scroller) {
      return 0;
    }

    const firstCard = scroller.firstElementChild as HTMLElement | null;

    if (!firstCard) {
      return scroller.clientWidth;
    }

    const gridStyles = getComputedStyle(scroller);
    const columnGap = Number.parseFloat(gridStyles.columnGap) || 0;

    return firstCard.getBoundingClientRect().width + columnGap;
  }

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
