import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../flight-list/flight.service';
import { OneWayFlightDto } from '../flight-list/one-way-flight-dto';
import { TwoWayFlightDto } from '../flight-list/two-way-flight-dto';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {

  searchFlightForm!: FormGroup;
  //range!: FormGroup;
  oneWayFlightDto!: OneWayFlightDto;
  twoWayFlightDto!: TwoWayFlightDto;
  checked = false;
  indeterminate = false;
  selectedVal = 0;
  constructor(private flightService: FlightService, private datepipe: DatePipe, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.searchFlightForm = new FormGroup({
      //airlineName: new FormControl('', Validators.required),
      //flightCode: new FormControl('', Validators.required),
      fromCity: new FormControl('', Validators.required),
      fromAirport: new FormControl('', Validators.required),
      departureTime: new FormControl('', Validators.required),
      departureTimeStart: new FormControl(''),
      departureTimeEnd: new FormControl(''),
      returnTime: new FormControl('', Validators.required),
      returnTimeStart: new FormControl('', Validators.required),
      returnTimeEnd: new FormControl('', Validators.required),
      toCity: new FormControl('', Validators.required),
      toAirport: new FormControl('', Validators.required),
      flexDate: new FormControl(false),
    });   
  }


  searchOneWayFlight(form: any){
    
    //const arTime = this.datepipe.transform(form.value.arrivalTime, 'yyyy-MM-dd');
    const dpTime = this.datepipe.transform(form.value.departureTime, 'yyyy-MM-dd');
    if(form.value.flexDate != true){
      this.oneWayFlightDto = {
      //returnTime: arTime!,
      departureTime: dpTime!,
      fromAirport: "",
      fromCity: form.value.fromCity,
      toCity: form.value.toCity,
      toAirport: "",
      TicketClass: this.selectedVal,
      departureTimeEnd: dpTime!
      }
    } else {
      const dpTime = this.datepipe.transform(form.value.departureTimeStart, 'yyyy-MM-dd');
      const dpTimeEnd = this.datepipe.transform(form.value.departureTimeEnd, 'yyyy-MM-dd');
      this.oneWayFlightDto = {
        //returnTime: arTime!,
        departureTime: dpTime!,
        fromAirport: "",
        fromCity: form.value.fromCity,
        toCity: form.value.toCity,
        toAirport: "",
        TicketClass: this.selectedVal,
        departureTimeEnd: dpTimeEnd!
    }
  }
    this.flightService.getOneWayFlightsInfo(this.oneWayFlightDto).subscribe(data=>{
      console.log("DATA===>:");
      console.log(data);
      
      
      this.flightService.flightSearchResult = data;
      this.flightService.isRefreshed = false;
      this.router.navigateByUrl('/home/flight-search-result');
      console.log(data);
      
    });
  
  
  }

  searchTwoWayFlight(form: any){
    const retTime = this.datepipe.transform(form.value.returnTime, 'yyyy-MM-dd');
    const dpTime = this.datepipe.transform(form.value.departureTime, 'yyyy-MM-dd');
    if(form.value.flexDate != true){
    this.twoWayFlightDto = {
      returnTime: retTime!,
      departureTime: dpTime!,
      departureTimeEnd: dpTime!,
      returnTimeEnd: retTime!,
      fromAirport: "",
      fromCity: form.value.fromCity,
      toCity: form.value.toCity,
      toAirport: "",
      TicketClass: this.selectedVal
    }
    } else {
      const dpTime = this.datepipe.transform(form.value.departureTimeStart, 'yyyy-MM-dd');
      const dpTimeEnd = this.datepipe.transform(form.value.departureTimeEnd, 'yyyy-MM-dd');
      const retTime = this.datepipe.transform(form.value.returnTimeStart, 'yyyy-MM-dd');
      const retTimeEnd = this.datepipe.transform(form.value.returnTimeEnd, 'yyyy-MM-dd');
      this.twoWayFlightDto = {
        returnTime: retTime!,
        departureTime: dpTime!,
        departureTimeEnd: dpTimeEnd!,
        returnTimeEnd: retTimeEnd!,
        fromAirport: "",
        fromCity: form.value.fromCity,
        toCity: form.value.toCity,
        toAirport: "",
        TicketClass: this.selectedVal
      }
    }
    
    this.flightService.getTwoWayFlightsInfo(this.twoWayFlightDto).subscribe(data => {
      console.log(data);
      this.flightService.roundFlightSearchResult = data;
      this.flightService.isRefreshed = false;
      this.router.navigateByUrl('/home/flight-search-two-way-result');
      
    });
  }



  public onValChange(val: number) {
    //console.log(val);
    
    this.selectedVal = val;
  }

}
