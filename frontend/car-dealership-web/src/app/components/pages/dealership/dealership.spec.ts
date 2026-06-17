import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealershipPage } from './dealership';

describe('Dealership', () => {
  let component: DealershipPage;
  let fixture: ComponentFixture<Dealership>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dealership],
    }).compileComponents();

    fixture = TestBed.createComponent(Dealership);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
