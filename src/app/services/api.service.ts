import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Room } from '../models/room';
import { Selected } from '../models/selected';
import { TimeSlot } from '../models/timeslot';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3001/api';

  constructor(private httpClient: HttpClient) {}

  private selectedBooking = new BehaviorSubject<Selected>({
    roomId: 0,
    timeSlotId: 0,
    date: '',
    bookedBy: '',
  });

  selected$ = this.selectedBooking.asObservable();

  setSelected(selected: Selected) {
    this.selectedBooking.next(selected);
  }

  getRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(`${this.baseUrl}/rooms`);
  }

  getAvailableSlots(
    roomId: number,
    dates: string[]
  ): Observable<{ date: string; slots: TimeSlot[] }[]> {
    const query = dates.join(',');
    return this.httpClient.get<{ date: string; slots: TimeSlot[] }[]>(
      `http://localhost:3001/api/rooms/${roomId}/available?dates=${query}`
    );
  }

  bookSlot(selected: Selected): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.baseUrl}/bookings`, selected);
  }
}
