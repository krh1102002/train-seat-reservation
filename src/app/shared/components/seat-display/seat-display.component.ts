import { Component, Input } from '@angular/core';
import { Seat } from '../../../core/models/seat.model';

@Component({
  selector: 'app-seat-display',
  templateUrl: './seat-display.component.html',
  styleUrls: ['./seat-display.component.scss'],
})
export class SeatDisplayComponent {
  @Input() seats: Seat[] = [];

  getRowSeats(rowNumber: number): Seat[] {
    return this.seats.filter((seat) => seat.rowNumber === rowNumber);
  }
}
