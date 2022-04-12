import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { AddFlightButton } from '../add-flight/add-flight.component';
import { AddTicketButton } from '../add-ticket/add-ticket.component';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  username!: string;
  constructor(private authService: AuthService, private observer: BreakpointObserver, private addFlightButton: AddFlightButton, private addTicketButton: AddTicketButton) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  openAddFlightDialog(): void {
    this.addFlightButton.openDialog();
  }
  openAddTicketDialog(): void {
    this.addTicketButton.openDialog();
  }

  logout(){
    this.authService.logout();
    
  }

}
