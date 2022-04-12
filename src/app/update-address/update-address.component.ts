import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FlightService } from '../flight-list/flight.service';
import { UserDetailsDto } from '../flight-list/user-details-dto';
import { MyErrorStateMatcher } from '../shared/error-state-matcher';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'update-address-button',
  templateUrl: 'update-address-button.html'
})
export class UpdateAddressButton {

  constructor(public dialog: MatDialog) {}

  openDialog(user: UserDetailsDto): void {
   
        const dialogRef = this.dialog.open(UpdateAddressComponent, {
          width: '500px',
          data: {user:user}
        }); 
        dialogRef.afterClosed().subscribe(result => {
          //console.log('The dialog was closed'); 
        });      
  }
}


@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss']
})
export class UpdateAddressComponent implements OnInit {

  updateAddressForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  user!: UserDetailsDto;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData, private router: Router, private flightService: FlightService, public dialogRef: MatDialogRef<UpdateAddressComponent> ) { }

  ngOnInit(): void {
    this.user = this.dialogData.user;
    this.updateAddressForm = new FormGroup({
      // username: new FormControl('', Validators.required),
      // firstName: new FormControl('', Validators.required),
      // lastName: new FormControl('', Validators.required),
      // phone: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]{7,}')]),
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      stateProvince: new FormControl('', Validators.required),
      zipCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5,}')]),
      country: new FormControl('', Validators.required),
      //email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
    });
    this.updateAddressForm.get('city')!.setValue(this.user.city);
    this.updateAddressForm.get('street')!.setValue(this.user.street);
    this.updateAddressForm.get('stateProvince')!.setValue(this.user.stateProvince);
    this.updateAddressForm.get('zipCode')!.setValue(this.user.zipCode);
    this.updateAddressForm.get('country')!.setValue(this.user.country);
  }

  updateAddress(userForm: any){
      console.log("Updating....");
      this.user = {
        email: "",
        username: "",
        id: this.user.id,
        firstName: "",
        lastName: "",
        phone: -1,
        city: this.updateAddressForm.get('city').value,
        country: this.updateAddressForm.get('country').value,
        stateProvince: this.updateAddressForm.get('stateProvince').value,
        street: this.updateAddressForm.get('street').value,
        zipCode: Number(this.updateAddressForm.get('zipCode').value)
      }
      this.flightService.updateAddress(this.user).subscribe(data => {
        console.log("Updated");
        location.reload();
        //this.router.navigate(['/home/user-details']);
        
        
      });
      
      

  }

}
