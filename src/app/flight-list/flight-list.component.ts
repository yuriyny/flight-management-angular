import { Component, OnInit } from '@angular/core';
import { FlightDto } from './flight-dto';
import { FlightService } from './flight.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {

  flights: Array<FlightDto> = [];
  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
   this.flightService.getAllFlights().subscribe(data =>{
     this.flights = data;
     console.log(data);
     console.log(this.flights);
     console.log("HERE");
     
     //console.log(this.flightService.flightSearchResult);
     
     
   });
  }

}
