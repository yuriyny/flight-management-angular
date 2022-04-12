import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchReturnResultComponent } from './flight-search-return-result.component';

describe('FlightSearchReturnResultComponent', () => {
  let component: FlightSearchReturnResultComponent;
  let fixture: ComponentFixture<FlightSearchReturnResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightSearchReturnResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchReturnResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
