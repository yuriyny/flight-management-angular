import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { FlightListComponent } from './flight-list/flight-list.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxMatDateFormats, NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { NgxCurrencyModule } from 'ngx-currency';
import { DatePipe } from '@angular/common';
import { FlightSearchResultComponent } from './flight-search-result/flight-search-result.component'
import {MatTabsModule} from '@angular/material/tabs';
import { FlightTicketsResultComponent } from './flight-tickets-result/flight-tickets-result.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { FlightSearchTwoWayResultComponent } from './flight-search-two-way-result/flight-search-two-way-result.component';
import { FlightSearchReturnResultComponent } from './flight-search-return-result/flight-search-return-result.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { TokenInterceptor } from './token-interceptor';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AllFlightsComponent } from './all-flights/all-flights.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { UserByIdComponent } from './user-by-id/user-by-id.component';


const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: "l, LTS"
  },
  display: {
    dateInput: "DD-MMM-YYYY, HH:mm",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchFlightComponent,
    FlightListComponent,
    LoginComponent,
    SignUpComponent,
    AddFlightComponent,
    AddTicketComponent,
    FlightSearchResultComponent,
    FlightTicketsResultComponent,
    ReservationListComponent,
    FlightSearchTwoWayResultComponent,
    FlightSearchReturnResultComponent,
    AllFlightsComponent,
    AllTicketsComponent,
    UserDetailsComponent,
    UpdateUserComponent,
    UpdateAddressComponent,
    UserByIdComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatMomentModule,
    MatSelectModule,
    MatButtonToggleModule,
    NgxCurrencyModule,
    MatTabsModule
    
    
  ],
  providers: [
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS
      
     },
     { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
