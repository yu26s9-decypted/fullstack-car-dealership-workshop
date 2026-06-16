import { Component, inject, OnInit, signal } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { AuthService } from '../../services/auth.service';
import { Vehicle } from '../../models/vehicle.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-modal',
  imports: [FormsModule],
  templateUrl: './order-modal.html',
  styleUrl: './order-modal.css',
})
export class OrderModal implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
  private vehicleService = inject(VehicleService)
  private authService = inject(AuthService)
  vehicle = signal<Vehicle[]>([]);
  

  form = {
    deliveryOption: '',
    deliveryAddress: ''
  }
  


}
