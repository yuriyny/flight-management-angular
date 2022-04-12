import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FlightService } from '../flight-list/flight.service';
import { ReservationDto } from './reservation-dto';
import { TwoWayReservationDto } from './two-way-reservation-dto';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  reservations: Array<TwoWayReservationDto> = [];
  constructor(private flightService: FlightService ) { }

  ngOnInit(): void {
    this.flightService.getUserReservations().subscribe(data => {
      this.reservations = data;
      console.log(data);    
    });
  }


  deleteReservation(){
    
  }


}
