import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
})
export class BookingFormComponent {
  @Output() book = new EventEmitter<number>();
  numSeats: number = 1;

  onSubmit() {
    this.book.emit(this.numSeats);
    this.numSeats = 1; // Reset the input after submission
  }
}
