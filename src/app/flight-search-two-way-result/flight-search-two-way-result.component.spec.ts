import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchTwoWayResultComponent } from './flight-search-two-way-result.component';

describe('FlightSearchTwoWayResultComponent', () => {
  let component: FlightSearchTwoWayResultComponent;
  let fixture: ComponentFixture<FlightSearchTwoWayResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightSearchTwoWayResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchTwoWayResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
