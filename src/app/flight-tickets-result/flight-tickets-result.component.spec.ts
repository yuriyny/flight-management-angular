import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightTicketsResultComponent } from './flight-tickets-result.component';

describe('FlightTicketsResultComponent', () => {
  let component: FlightTicketsResultComponent;
  let fixture: ComponentFixture<FlightTicketsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightTicketsResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightTicketsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
