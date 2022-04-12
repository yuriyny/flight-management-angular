import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FlightsDetailsDto } from '../all-flights/flights-details-dto';
import { TicketsDetailsDto } from '../all-tickets/tickets-details-dto';
import { AddReservationDto } from '../reservation-list/add-reservation-dto';
import { ReservationDto } from '../reservation-list/reservation-dto';
import { TwoWayReservationDto } from '../reservation-list/two-way-reservation-dto';
import { FlightDto } from './flight-dto';
import { FlightInfoDto } from './flight-info-dto';
import { OneWayFlightDto } from './one-way-flight-dto';
import { TicketDto } from './ticket-dto';
import { TwoWayFlightDto } from './two-way-flight-dto';
import { TwoWayFlightInfoDto } from './two-way-flight-info-dto';
import { UserDetailsDto } from './user-details-dto';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  flightSearchResult: Array<FlightInfoDto> = [];
  flightsDetailsList: Array<FlightsDetailsDto> = [];
  flightsDetails = new BehaviorSubject<Array<FlightsDetailsDto> | null>(null);
  ticketsDetailsList: Array<TicketsDetailsDto> = [];
  ticketsDetails = new BehaviorSubject<Array<TicketsDetailsDto> | null>(null);
  roundFlightSearchResult!: TwoWayFlightInfoDto;
  isRefreshed = true;
  twoWayReservationDto!: TwoWayReservationDto;
  selectedFlights!: AddReservationDto;
  constructor(private http: HttpClient) { }

  addFlight(flightDto: FlightDto): Observable<any> {
    return this.http.post('http://localhost:4518/api/Flight/add-flight', flightDto);
  }
  
  getAllFlights(): Observable<Array<FlightDto>> {
    return this.http.get<Array<FlightDto>>('http://localhost:4518/api/Flight/get-all-flights');
  }

  addTicket(ticketDto: TicketDto): Observable<any> {
    return this.http.post('http://localhost:4518/api/Flight/add-ticket', ticketDto);
  }

  getDateFlights(oneWayFlightDto: OneWayFlightDto): Observable<Array<FlightDto>> {
    return this.http.post<Array<FlightDto>>('http://localhost:4518/api/Flight/get-date-flights', oneWayFlightDto);
  }

  getOneWayFlightsInfo(oneWayFlightDto: OneWayFlightDto): Observable<Array<FlightInfoDto>> {
    return this.http.post<Array<FlightInfoDto>>('http://localhost:4518/api/Flight/get-flights-info', oneWayFlightDto);
  }

  getTwoWayFlightsInfo(twoWayFlightDto: TwoWayFlightDto): Observable<TwoWayFlightInfoDto> {
    return this.http.post<TwoWayFlightInfoDto>('http://localhost:4518/api/Flight/get-two-way-flights-info', twoWayFlightDto);
  }

  getUserReservations(): Observable<Array<TwoWayReservationDto>> {
    return this.http.get<Array<TwoWayReservationDto>>('http://localhost:4518/api/Flight/get-user-reservations');
  }

  addReservation(addReservationDto: AddReservationDto): Observable<any> {
    return this.http.post('http://localhost:4518/api/Flight/add-reservation', addReservationDto);
  }

  getFlightsDetails():Observable<Array<FlightsDetailsDto>>{
    return this.http.get<Array<FlightsDetailsDto>>('http://localhost:4518/api/Flight/get-flights-details');
  }

  getTicketsDetails():Observable<Array<TicketsDetailsDto>>{
    return this.http.get<Array<TicketsDetailsDto>>('http://localhost:4518/api/Flight/get-tickets-details');
  }

  getUserDetails():Observable<UserDetailsDto>{
    return this.http.get<UserDetailsDto>('http://localhost:4518/api/User/get-user');
  }
  getUserDetailsById(id: number):Observable<UserDetailsDto>{
    return this.http.get<UserDetailsDto>('http://localhost:4518/api/User/get-user-by-id/' + id);
  }

  updateUser(userDetailsDto: UserDetailsDto): Observable<any> {
    return this.http.post('http://localhost:4518/api/User/update-user', userDetailsDto);
  }

  updateAddress(userDetailsDto: UserDetailsDto): Observable<any> {
    return this.http.post('http://localhost:4518/api/User/update-address', userDetailsDto);
  }

  
  
}
