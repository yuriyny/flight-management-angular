import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightInfoDto } from '../flight-list/flight-info-dto';
import { FlightService } from '../flight-list/flight.service';
import { TwoWayFlightInfoDto } from '../flight-list/two-way-flight-info-dto';
import { AddReservationDto } from '../reservation-list/add-reservation-dto';

@Component({
  selector: 'app-flight-search-two-way-result',
  templateUrl: './flight-search-two-way-result.component.html',
  styleUrls: ['./flight-search-two-way-result.component.scss']
})
export class FlightSearchTwoWayResultComponent implements OnInit {

  selectedClass!: number;
  selectedFlight!: AddReservationDto;
  flights!: TwoWayFlightInfoDto;
  constructor(private flightService: FlightService, private router: Router) { }

  ngOnInit(): void {
    if(this.flightService.isRefreshed){
      this.router.navigateByUrl('/home/search-flight');
    }
    this.flights = this.flightService.roundFlightSearchResult;
    console.log(this.flights);
  }

  bookFlight(flight: FlightInfoDto){
    if(this.selectedClass == 0){
      this.flightService.selectedFlights = {
        selectedTicketId: flight.economyTicketPriceId,
        returnTicketId: -1
      }
    }
    if(this.selectedClass == 1){
      this.flightService.selectedFlights = {
        selectedTicketId: flight.businessTicketPriceId,
        returnTicketId: -1
      }
    }  
      this.router.navigateByUrl('/home/flight-search-return-result');  
  }

}
