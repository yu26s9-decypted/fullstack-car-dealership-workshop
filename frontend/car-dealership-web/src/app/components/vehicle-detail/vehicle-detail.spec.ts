import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { VehicleDetail } from './vehicle-detail';

describe('VehicleDetail', () => {
  let component: VehicleDetail;
  let fixture: ComponentFixture<VehicleDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleDetail],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ slug: 'Andara-S1-2026' }),
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
