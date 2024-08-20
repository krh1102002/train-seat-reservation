import { Component, OnInit } from '@angular/core';
import { SeatReservationService } from '../../core/services/seat-reservation.service';
import { Seat } from '../../core/models/seat.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.scss'],
})
export class SeatReservationComponent implements OnInit {
  seats: Seat[] = [];
  numSeats: number = 1;

  constructor(
    private seatService: SeatReservationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.seatService.seats$.subscribe((seats) => {
      this.seats = seats;
    });
  }

  bookSeats() {
    if (this.numSeats < 1 || this.numSeats > 7) {
      this.showMessage('Please select 1 to 7 seats.');
      return;
    }

    this.seatService.bookSeats(this.numSeats).subscribe(
      (bookedSeats) => {
        this.showMessage(
          `Successfully booked seats: ${bookedSeats.join(', ')}`
        );
        this.numSeats = 1;
      },
      (error) => {
        this.showMessage(
          error.error.message || 'Something went wrong. Please try again.'
        );
      }
    );
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  getRows(): number[] {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }

  getSeatsForRow(row: number): Seat[] {
    return this.seats.filter((seat) => seat.rowNumber === row);
  }
}
