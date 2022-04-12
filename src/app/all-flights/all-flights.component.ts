import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { FlightInfoDto } from '../flight-list/flight-info-dto';
import { FlightService } from '../flight-list/flight.service';
import { AuthService } from '../shared/auth.service';
import { FlightsDetailsDto } from './flights-details-dto';

@Component({
  selector: 'app-all-flights',
  templateUrl: './all-flights.component.html',
  styleUrls: ['./all-flights.component.scss']
})

export class AllFlightsComponent implements OnInit {

  displayedColumns = ['flightId', 'flightCode', 'airlineName', 'fromCity', 'fromAirport', 'departureTime', 'arrivalTime', 'toCity', 'toAirport', 'economyTickets', 'businessTickets'];
  dataSource!: MatTableDataSource<FlightsDetailsDto>;
  //projects: Array<ProjectResponse> = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  flightInfoDto!: FlightsDetailsDto;
  ownProjects = false;
  constructor(private router: Router, private flightService: FlightService, private authService: AuthService) { }

  ngOnInit(): void {
    this.flightService.getFlightsDetails().subscribe(data => { 
      this.flightService.flightsDetailsList = data;
      this.dataSource = new MatTableDataSource(this.flightService.flightsDetailsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.flightService.flightsDetails.next(data);
      this.flightService.flightsDetails.subscribe(() => {
        this.dataSource.data = this.flightService.flightsDetailsList;       
      })
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
