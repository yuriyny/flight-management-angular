import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FlightService } from '../flight-list/flight.service';
import { UserDetailsDto } from '../flight-list/user-details-dto';
import { AuthService } from '../shared/auth.service';
import { MyErrorStateMatcher } from '../shared/error-state-matcher';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'update-user-button',
  templateUrl: 'update-user-button.html'
})
export class UpdateUserButton {

  constructor(public dialog: MatDialog) {}

  openDialog(user: UserDetailsDto): void {
   
        const dialogRef = this.dialog.open(UpdateUserComponent, {
          width: '500px',
          data: {user:user}
        }); 
        dialogRef.afterClosed().subscribe(result => {
          //console.log('The dialog was closed'); 
        });      
  }
}


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  updateUserForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  user!: UserDetailsDto;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData, private router: Router, private flightService: FlightService, public dialogRef: MatDialogRef<UpdateUserComponent> ) { }

  ngOnInit(): void {
    this.user = this.dialogData.user;
    this.updateUserForm = new FormGroup({
      username: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]{7,}')]),
      // street: new FormControl('', Validators.required),
      // city: new FormControl('', Validators.required),
      // stateProvince: new FormControl('', Validators.required),
      // zipCode: new FormControl('', Validators.required),
      // country: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
    });
    this.updateUserForm.get('username')!.setValue(this.user.username);
    this.updateUserForm.get('email')!.setValue(this.user.email);
    this.updateUserForm.get('firstName')!.setValue(this.user.firstName);
    this.updateUserForm.get('lastName')!.setValue(this.user.lastName);
    this.updateUserForm.get('phone')!.setValue(this.user.phone);
  }

  updateUser(userForm: any){
      console.log("Updating....");
      this.user = {
        email: this.updateUserForm.get('email').value.toLowerCase(),
        username: this.updateUserForm.get('username').value.toLowerCase(),
        id: this.user.id,
        firstName: this.updateUserForm.get('firstName').value.toLowerCase(),
        lastName: this.updateUserForm.get('lastName').value.toLowerCase(),
        phone: Number(this.updateUserForm.get('phone').value),
        city: "",
        country: "",
        stateProvince: "",
        street: "",
        zipCode: -1
      }
      this.flightService.updateUser(this.user).subscribe(data => {
        console.log("Updated");
        location.reload();
        //this.router.navigate(['/home/user-details']);
        
        
      });
      
      

  }

}
