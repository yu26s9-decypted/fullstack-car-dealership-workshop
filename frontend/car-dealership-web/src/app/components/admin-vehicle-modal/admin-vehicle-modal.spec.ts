import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVehicleModal } from './admin-vehicle-modal';

describe('AdminVehicleModal', () => {
  let component: AdminVehicleModal;
  let fixture: ComponentFixture<AdminVehicleModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVehicleModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminVehicleModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
