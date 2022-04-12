import { Component, Inject, Injectable, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { now } from 'moment';
import { FlightDto } from '../flight-list/flight-dto';
import { FlightListComponent } from '../flight-list/flight-list.component';
import { FlightService } from '../flight-list/flight.service';
import { AuthService } from '../shared/auth.service';
import { MyErrorStateMatcher } from '../shared/error-state-matcher';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'add-flight-button',
  templateUrl: 'add-flight-button.html',
  styleUrls: ['./add-flight.component.scss']
})
export class AddFlightButton {
  projectId!: number;
  airlineName!: string;
  flightCode!: string;
  userFormControl = new FormControl('', [
    Validators.required,
  ]);


  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddFlightComponent, {
      width: '500px',
      data: { airlineName: this.airlineName, flightCode: this.flightCode }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');

    });
  }

}







@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.scss']
})
export class AddFlightComponent implements OnInit {

  addFlightForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  loading = false;
  flightDto!: FlightDto;
  selected!: Date | null;
  minDate = new Date(now());
  //maxDate: Date

  constructor(private authService: AuthService, private flightService: FlightService, private route: Router, public dialogRef: MatDialogRef<AddFlightComponent>,
     ) {}

  ngOnInit(): void {
    this.addFlightForm = new FormGroup({
      airlineName: new FormControl('', Validators.required),
      flightCode: new FormControl('', Validators.required),
      fromCity: new FormControl('', Validators.required),
      fromAirport: new FormControl('', Validators.required),
      departureTime: new FormControl('', Validators.required),
      arrivalTime: new FormControl('', Validators.required),
      toCity: new FormControl('', Validators.required),
      toAirport: new FormControl('', Validators.required)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addFlight(form: any) {

    this.flightDto = {
      airlineName: form.value.airlineName,
      flightCode: form.value.flightCode,
      fromAirport: form.value.fromAirport,
      fromCity: form.value.fromCity,
      departureTime: form.value.departureTime,
      toAirport: form.value.toAirport,
      toCity: form.value.toCity,
      arrivalTime: form.value.arrivalTime
    }

    this.flightService.addFlight(this.flightDto).subscribe(data =>{
      this.dialogRef.close();
      location.reload();
      
    })
    // if (this.authService.getUserName() === 'guest') {
    //   this.dialogRef.close();
    // }
    // else {
    //   this.loading = true;
    //   this.projectDto.projectName = form.value.projectname;
    //   this.projectDto.projectDescription = form.value.description;
    //   //console.log(this.projectDto);

    //   //this.projectService.projectList.push(this.projectDto);
    //   this.projectService.addProject(this.projectDto).subscribe((data: { projectId: any; }) => {
    //     //console.log(data);

    //     this.projectService.projectList.push(data);
    //     this.projectService.projects.next(data);
    //     this.loading = false;
    //     this.dialogRef.close();
    //     this.route.navigate(['/home/project/', data.projectId]);

    //   });
    // }
    //this.dialogRef.close();
    //form.reset(); 
  }

}
