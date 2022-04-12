import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllFlightsComponent } from './all-flights/all-flights.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightSearchResultComponent } from './flight-search-result/flight-search-result.component';
import { FlightSearchReturnResultComponent } from './flight-search-return-result/flight-search-return-result.component';
import { FlightSearchTwoWayResultComponent } from './flight-search-two-way-result/flight-search-two-way-result.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { AuthGuard } from './shared/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserByIdComponent } from './user-by-id/user-by-id.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home/search-flight', pathMatch: 'full'},
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard],
    children: [
      { path: 'search-flight', component: SearchFlightComponent},
      { path: 'flight-list', component: FlightListComponent},
      { path: 'flights-details', component: AllFlightsComponent},
      { path: 'tickets-details', component: AllTicketsComponent},
      { path: 'user-details', component: UserDetailsComponent},
      { path: 'user-details/:id', component: UserByIdComponent},
      { path: 'flight-search-result', component: FlightSearchResultComponent},
      { path: 'flight-search-two-way-result', component: FlightSearchTwoWayResultComponent},
      { path: 'flight-search-return-result', component: FlightSearchReturnResultComponent},
      { path: 'my-reservations', component: ReservationListComponent},
    ]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
