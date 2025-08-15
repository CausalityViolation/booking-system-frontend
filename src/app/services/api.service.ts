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

  getAvailableSlots(roomId: number, date: string): Observable<TimeSlot[]> {
    return this.httpClient.get<TimeSlot[]>(
      `http://localhost:3001/api/rooms/${roomId}/available?date=${date}`
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
