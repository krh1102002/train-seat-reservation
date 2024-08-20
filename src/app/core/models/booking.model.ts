export interface Booking {
  _id?: string;
  bookingTime: Date;
  numSeats: number;
  seats: number[];
}
