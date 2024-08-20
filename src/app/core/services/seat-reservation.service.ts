import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Seat } from '../models/seat.model';

@Injectable({
  providedIn: 'root',
})
export class SeatReservationService {
  private apiUrl = 'http://localhost:3000/api';
  private seatsSubject = new BehaviorSubject<Seat[]>([]);
  seats$ = this.seatsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchSeats();
  }

  private fetchSeats() {
    this.http.get<Seat[]>(`${this.apiUrl}/seats`).subscribe(
      (seats) => this.seatsSubject.next(seats),
      (error) => console.error('Error fetching seats:', error)
    );
  }

  bookSeats(numSeats: number): Observable<number[]> {
    return this.http
      .post<{ bookedSeats: number[] }>(`${this.apiUrl}/book`, { numSeats })
      .pipe(
        map((response) => response.bookedSeats),
        tap((bookedSeats) => {
          console.log('Booked seats:', bookedSeats);
          this.fetchSeats();
        })
      );
  }
}
