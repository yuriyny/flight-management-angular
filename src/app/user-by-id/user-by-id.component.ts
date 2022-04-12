import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../flight-list/flight.service';
import { UserDetailsDto } from '../flight-list/user-details-dto';
import { UpdateAddressButton } from '../update-address/update-address.component';
import { UpdateUserButton } from '../update-user/update-user.component';

@Component({
  selector: 'app-user-by-id',
  templateUrl: './user-by-id.component.html',
  styleUrls: ['./user-by-id.component.scss']
})
export class UserByIdComponent implements OnInit {

  userDetails!: UserDetailsDto;

  constructor(private activateRoute: ActivatedRoute, private flightService: FlightService, private updateUserButton: UpdateUserButton, private updateAddressButton: UpdateAddressButton) { }

  ngOnInit(): void {
    console.log("Here in");
    console.log(this.activateRoute.snapshot.params['id']);
    
    this.flightService.getUserDetailsById(this.activateRoute.snapshot.params['id']).subscribe(data => {
      this.userDetails = data;
      console.log(this.userDetails);
      
    })
  }

  updateUser() {
    this.updateUserButton.openDialog(this.userDetails);
  }

  updateAddress() {
    this.updateAddressButton.openDialog(this.userDetails);
  }


}
