import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightInfoDto } from '../flight-list/flight-info-dto';
import { FlightService } from '../flight-list/flight.service';
import { AddReservationDto } from '../reservation-list/add-reservation-dto';

@Component({
  selector: 'app-flight-search-result',
  templateUrl: './flight-search-result.component.html',
  styleUrls: ['./flight-search-result.component.scss']
})
export class FlightSearchResultComponent implements OnInit {
  selectedClass!: number;
  selectedFlight!: AddReservationDto;
  flights: Array<FlightInfoDto> = [];
  constructor(private flightService: FlightService, private router: Router) { }
  

  ngOnInit(): void {
    if(this.flightService.isRefreshed){
      this.router.navigateByUrl('/home/search-flight');
    }
    console.log("Inside result component");
    
     this.flights = this.flightService.flightSearchResult;
    console.log(this.flights);
    
  }

  bookFlight(flight: FlightInfoDto){
    //console.log(flight);
    //console.log(this.selectedClass);
    if(this.selectedClass == 0){
      this.selectedFlight = {
        selectedTicketId: flight.economyTicketPriceId,
        returnTicketId: -1
      }
    }
    if(this.selectedClass == 1){
      this.selectedFlight = {
        selectedTicketId: flight.businessTicketPriceId,
        returnTicketId: -1
      }
    }
    console.log(this.selectedFlight);
    this.flightService.addReservation(this.selectedFlight).subscribe(data => {
      console.log(this.selectedFlight);
      
      console.log("Saved");
      //this.router.navigateByUrl('/home/my-reservations');   
    });    
  }


}
