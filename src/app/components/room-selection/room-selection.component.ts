import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Room } from '../../models/room';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-room-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room-selection.component.html',
  styleUrl: './room-selection.component.scss',
})
export class RoomSelectionComponent {
  rooms: Room[] = [];
  selectedDate = '2025-10-18'; // hardcoded for now

  //Create HTML so it shows the available times for the selected ID
  selectedRoomID = 0;

  constructor(private api: ApiService, public router: Router) {}

  ngOnInit() {
    this.api.getRooms().subscribe((data) => (this.rooms = data));
  }

  confirmRoomSelection() {
    this.rooms.forEach((room) => {
      if (room.selected) {
        this.selectedRoomID = room.id;
        this.api
          .getAvailableSlots(room.id, this.selectedDate)
          .subscribe((slots) => (room.timeSlots = slots));
      } else {
        room.timeSlots = [];
        // Also unselect any previously selected slot
        room.timeSlots?.forEach((s) => (s.selected = false));
      }
    });
  }

  deselectRooms() {
    this.rooms.forEach((room) => {
      room.selected = false;
    });
  }

  next() {
    // this.api.setSelectedRooms(this.rooms); // only rooms with room.selected = true
    this.router.navigate(['/booking-form']);
  }
}
