import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChargingComponent } from './new-charging.component';

describe('NewChargingComponent', () => {
  let component: NewChargingComponent;
  let fixture: ComponentFixture<NewChargingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewChargingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewChargingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
