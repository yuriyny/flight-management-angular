export class ReservationDto {
    reservationTime!: number;
    ticketId!: number;
    airlineName!: string;
    fromAirport!: string;
    fromCity!: string;
    flightCode!: string;
    ticketClass!: number;
    toAirport!: string;
    toCity!: string;
    departureTime!: string;
    arrivalTime!: string;
    ticketPrice!: number;
    returnTicketId!: number;
    returnTicketPrice!: number;
    flightDurationHours!: number;
    flightDurationMinutes!: number;
    flightDurationDays!: number;
}