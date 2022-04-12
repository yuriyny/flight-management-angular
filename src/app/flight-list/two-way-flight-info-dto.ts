import { FlightInfoDto } from "./flight-info-dto";

export class TwoWayFlightInfoDto {
    departureFlights!: Array<FlightInfoDto>;
    returnFlights!: Array<FlightInfoDto>;

}