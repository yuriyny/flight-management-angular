import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightDto } from '../flight-list/flight-dto';
import { FlightService } from '../flight-list/flight.service';
import { TicketDto } from '../flight-list/ticket-dto';
import { AuthService } from '../shared/auth.service';
import { MyErrorStateMatcher } from '../shared/error-state-matcher';
import { CurrencyMaskInputMode} from "ngx-currency";

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'add-ticket-button',
  templateUrl: 'add-ticket-button.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketButton {
  //@Input() projectId: number;
  //ticketName: string;
  //ticketDescription: string;


  constructor(public dialog: MatDialog, private flightService: FlightService, private activateRoute: ActivatedRoute) { }

  openDialog(): void {

    this.flightService.getAllFlights().subscribe(flights => {
      if(flights.length > 0){
        const dialogRef = this.dialog.open(AddTicketComponent, {
          width: '500px',
          data: { flights: flights }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
      }
    });


    // if (this.projectService.addTicketSidePanel) {
    //   this.projectService.addTicketSidePanel = false;
    //   this.projectService.getProjectsForCurrentUser().subscribe(project => {
    //     if (project.length == 0) {
    //       let info = 'You must have a project with admin role in order to create tickets'
    //       const dialogRef = this.dialog.open(MissingProjectWindowComponent, {
    //         width: '500px',
    //         data: { info: info }
    //       });
    //       dialogRef.afterClosed().subscribe(result => {
    //         //console.log('The dialog was closed');
    //       });
    //     }
    //     if (project.length > 0) {
    //       const dialogRef = this.dialog.open(AddTicketComponent, {
    //         width: '500px',
    //         data: { project: project, sidePanel: true, route: this.activateRoute.snapshot.params.projectId }
    //       });
    //       dialogRef.afterClosed().subscribe(result => {
    //         //console.log('The dialog was closed');
    //       });
    //     }
    //   });
    // }
    // else {
    //   this.projectService.getProjectById(this.projectId).subscribe(project => {
    //     const dialogRef = this.dialog.open(AddTicketComponent, {
    //       width: '500px',
    //       data: { project: project, sidePanel: false, route: this.activateRoute.snapshot.params.projectId }
    //     });
    //     dialogRef.afterClosed().subscribe(result => {
    //       //console.log('The dialog was closed');
    //     });
    //   });
    // }
  }
}




@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {

  addTicketForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  selectedVal = 0;
  //projectList: Array<ProjectResponse> = [];
  flightList: Array<FlightDto> = [];
  //memberList: Array<ParticipantDto> = [];
  priority = 0;
  //ticketResponse: TicketResponse;
  projectId = 1;
  selectedProject = "";
  ticketDto!: TicketDto;
  options = {allowZero: false, align: "left", prefix: '$', thousands: ',', decimal: '.', inputMode: CurrencyMaskInputMode.FINANCIAL}

  //assignTo: ParticipantDto;
  constructor(private router: Router, public authService: AuthService, public flightService:FlightService, public dialogRef: MatDialogRef<AddTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) { }

  ngOnInit(): void {
    this.selectedVal = 0;
    this.addTicketForm = new FormGroup({
      flightCode: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
    this.flightList = this.dialogData.flights;

    // if (this.dialogData.sidePanel == false) {
    //   this.projectList.push(this.dialogData.project);
    //   this.addTicketForm.get('selectedProject').setValue(this.dialogData.project);
    //   this.selectedProject = this.dialogData.project;
    //   this.projectId = this.dialogData.project.projectId;
    //   this.projectsService.getProjectMembersByProjectId(this.dialogData.project.projectId).subscribe(members => {
    //     this.memberList = members;
    //   });
    // } else {
    //   this.projectList = this.dialogData.project;
    // }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public onValChange(val: number) {
    console.log("changing:" + val);
    
    this.selectedVal = val;
    console.log("val: " + this.selectedVal);
    
  }

  addTicket(form: any) {
    console.log(this.selectedVal);
    this.ticketDto = {
      flightCode: form.value.flightCode.flightCode,
      price: form.value.price,
      ticketClass: Number(this.selectedVal)
    }
    // console.log(this.selectedVal);
    
    // console.log(this.ticketDto);
    // console.log(form.value.price);
    
    this.flightService.addTicket(this.ticketDto).subscribe(data=>{
      //console.log("Ticket Added");
      this.dialogRef.close();
      location.reload();
      //this.router.navigate(['/home/tickets']);
    })
    // if (this.authService.getUserName() === 'guest') {
    //   this.dialogRef.close();
    // }
    // else {
    //   this.ticketResponse = {
    //     ticketId: null,
    //     ticketName: form.value.ticketName,
    //     projectId: this.projectId,
    //     projectName: "",
    //     description: form.value.description,
    //     priority: this.addTicketForm.get('priority').value,
    //     createdDate: null,
    //     updatedDate: null,
    //     creatorName: null,
    //     creatorId: null,
    //     assignedParticipant: this.addTicketForm.get('assignTo').value.participantId,
    //     assignedParticipantName: null,
    //     status: 0
    //   }

    //   this.ticketsService.addTicket(this.ticketResponse).subscribe(data => {
    //     this.dialogRef.close();
    //     this.router.navigate(['/home/ticket/', data.ticketId]);
        // if (this.dialogData.route && this.dialogData.route == data.projectId) {
        //   if (this.ticketsService.ticketCardFilter.value === 'ALL' ||
        //     (this.ticketsService.ticketCardFilter.value === 'ASSIGNED' && data.assignedParticipantName == this.authService.getUserName())) {
        //     this.ticketsService.ticketList.push(data);
        //     this.ticketsService.tickets.next(this.ticketsService.ticketList);
        //   }
        // } else {
        //   this.router.navigate(['/home/tickets']);
        // }
      //});
   // }


    // form.reset();
  }

  // updateMemberList(p: ProjectResponse) {
  //   this.projectId = p.projectId;
  //   this.projectsService.getProjectMembersByProjectId(p.projectId).subscribe(members => {
  //     this.memberList = members;
  //   })

  // }

}
