import { ReservationDto } from "./reservation-dto";

export class TwoWayReservationDto {
    departureReservation!: ReservationDto;
    returnReservation!: ReservationDto;
}