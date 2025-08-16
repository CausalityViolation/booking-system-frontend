import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../models/room';
import { TimeSlot } from '../models/timeslot';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:3001/api';

  constructor(private httpClient: HttpClient) {}

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

  bookSlot(
    roomId: number,
    timeSlotId: number,
    date: string,
    bookedBy: string
  ): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/bookings`, {
      roomId,
      timeSlotId,
      date,
      bookedBy,
    });
  }
}
