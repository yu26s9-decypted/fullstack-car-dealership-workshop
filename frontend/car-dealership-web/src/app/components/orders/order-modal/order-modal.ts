import { Component, OnInit, inject, input, output, signal } from '@angular/core';
import { Vehicle } from '../../../models/vehicle.model';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FinanceEstimate } from '../../../models/orderestimate.model';
import { VehicleService } from '../../../services/vehicle.service';

@Component({
  selector: 'app-order-modal',
  imports: [FormsModule, CurrencyPipe, DecimalPipe],
  templateUrl: './order-modal.html',
  styleUrl: './order-modal.css',
})
export class OrderModal implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private vehicleService = inject(VehicleService);

  vehicle = input.required<Vehicle>();
  closeModal = output<void>();
  selectedPaymentType = signal<'finance' | 'cash'>('finance');
  downPayment = signal<number>(0);
  termMonth = signal<number>(84);
  isTermMenuOpen = signal(false);
  termOptions = [36, 48, 60, 72, 84];
  estimatePayment = signal<FinanceEstimate | null>(null);
  displayMonthlyPayment = signal(0);
  paymentSummaryText = signal('');
  isCalculating = signal(false);
  

  form = {
    deliveryOption: 'pickup',
    deliveryAddress: '',
    notes: ''
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.closeModal.emit();
      this.router.navigate(['/login']);
      return;
    }

    this.updateDisplayMonthlyPayment();
    this.getEstimate();
  }

  get customerName(): string {
    const payload = this.getTokenPayload();

    if (!payload) return '';

    const fullName = [payload['firstName'], payload['lastName']].filter(Boolean).join(' ');
    return fullName || payload['name'] || payload['email'] || payload['sub'] || '';
  }

  get customerPhone(): string {
    return this.getTokenPayload()?.['phone'] || '';
  }

  get customerRegion(): string {
    return this.getTokenPayload()?.['region'] || '';
  }

  onClose(){
    this.closeModal.emit()
  }

  selectPaymentType(type: 'finance' | 'cash') {
    this.selectedPaymentType.set(type);
    this.estimatePayment.set(null);
    this.isCalculating.set(false);

    if (type === 'finance') {
      this.getEstimate();
    } else {
      this.updatePaymentSummaryText();
    }
  }

  updateDownPayment(value: string) {
    this.downPayment.set(Number(value) || 0);
    this.estimatePayment.set(null);
    this.getEstimate();
  }

  toggleTermMenu() {
    this.isTermMenuOpen.update((isOpen) => !isOpen);
  }

  selectTermMonth(term: number) {
    this.termMonth.set(Number(term));
    this.isTermMenuOpen.set(false);
    this.estimatePayment.set(null);
    this.getEstimate();
  }

  estimatedMonthlyPayment(): number {
    return this.displayMonthlyPayment();
  }

  paymentSummaryLabel(): string {
    return this.selectedPaymentType() === 'finance' ? 'Estimated payment' : 'Total price';
  }

  visiblePaymentSummaryText(): string {
    return this.paymentSummaryText() || this.getPaymentSummaryText();
  }

  getEstimate(){
    const vehicle = this.vehicle();

    if (this.selectedPaymentType() !== 'finance') return;

    this.updateDisplayMonthlyPayment();
    this.isCalculating.set(true)

    const req = {
      vehicleId: vehicle.id,
      paymentType: this.selectedPaymentType(),
      downPayment: this.downPayment(),
      termMonths: this.termMonth(),
      monthlyPayment: 0,
      totalPayment: 0
    }

    this.vehicleService.getOrderEstimate(req).subscribe({
      next: (result) => {
        if (this.selectedPaymentType() !== 'finance') return;

        this.estimatePayment.set(result);
        this.displayMonthlyPayment.set(result.monthlyPayment);
        this.updatePaymentSummaryText();
        this.isCalculating.set(false)
      },
      error: (err: unknown) => {
        console.error(err)
        this.isCalculating.set(false)
      }
    });
  }

  private getFallbackMonthlyPayment(): number {
    return Math.max(this.vehicle().price - this.downPayment(), 0) / this.termMonth();
  }

  private updateDisplayMonthlyPayment(): void {
    this.displayMonthlyPayment.set(this.estimatePayment()?.monthlyPayment ?? this.getFallbackMonthlyPayment());
    this.updatePaymentSummaryText();
  }

  private updatePaymentSummaryText(): void {
    this.paymentSummaryText.set(this.getPaymentSummaryText());
  }

  private getPaymentSummaryText(): string {
    if (this.selectedPaymentType() === 'cash') {
      return this.formatCurrency(this.vehicle().price);
    }

    const monthlyPayment = this.displayMonthlyPayment() || this.getFallbackMonthlyPayment();
    return `${this.formatCurrency(monthlyPayment)}/mo`;
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(Number.isFinite(value) ? value : 0);
  }

  onOrder(){
    const vehicle = this.vehicle();

    const orderRequest = {
      vehicleId: vehicle.id,
      vehicleName: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      price: vehicle.price,
      customerName: this.customerName,
      customerPhone: this.customerPhone,
      customerRegion: this.customerRegion,
      paymentType: this.selectedPaymentType(),
      downPayment: this.downPayment(),
      termMonths: this.selectedPaymentType() === 'finance' ? this.termMonth() : null,
      estimatedMonthlyPayment: this.estimatePayment()?.monthlyPayment ?? null,
      ...this.form
    };

    console.log("order request", orderRequest)
  }

  private getTokenPayload(): Record<string, string> | null {
    const token = this.authService.getToken();

    if (!token) return null;

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }
  


}
