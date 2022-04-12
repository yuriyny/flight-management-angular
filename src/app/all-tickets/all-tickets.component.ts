import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FlightService } from '../flight-list/flight.service';
import { TicketsDetailsDto } from './tickets-details-dto';

@Component({
  selector: 'app-all-tickets',
  templateUrl: './all-tickets.component.html',
  styleUrls: ['./all-tickets.component.scss']
})
export class AllTicketsComponent implements OnInit {

  displayedColumns = ['ticketId', 'ticketClass', 'flightCode', 'price', 'username'];
  dataSource!: MatTableDataSource<TicketsDetailsDto>;
  //projects: Array<ProjectResponse> = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ticketInfoDto!: TicketsDetailsDto;
  ownProjects = false;
  constructor(private router: Router, private flightService: FlightService) { }

  ngOnInit(): void {
    this.flightService.getTicketsDetails().subscribe(data => { 
      this.flightService.ticketsDetailsList = data;
      this.dataSource = new MatTableDataSource(this.flightService.ticketsDetailsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.flightService.ticketsDetails.next(data);
      this.flightService.flightsDetails.subscribe(() => {
        this.dataSource.data = this.flightService.ticketsDetailsList;       
      })
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
