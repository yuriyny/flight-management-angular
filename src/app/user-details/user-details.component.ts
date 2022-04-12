import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight-list/flight.service';
import { UserDetailsDto } from '../flight-list/user-details-dto';
import { UpdateAddressButton } from '../update-address/update-address.component';
import { UpdateUserButton} from '../update-user/update-user.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userDetails!: UserDetailsDto;

  constructor(private flightService: FlightService, private updateUserButton: UpdateUserButton, private updateAddressButton: UpdateAddressButton) { }

  ngOnInit(): void {
    this.flightService.getUserDetails().subscribe(data => {
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
