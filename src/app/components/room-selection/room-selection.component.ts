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
  dates = ['2025-10-18', '2025-10-19', '2025-10-20']; // hardcoded for now

  //Create HTML so it shows the available times for the selected ID
  selectedRoomID = 0;
  selectedRooms: number[] = [];
  toggleMenu = false;
  showTimeSlots = false;

  constructor(private api: ApiService, public router: Router) {}

  ngOnInit() {
    this.api.getRooms().subscribe((data) => {
      this.rooms = data;
      this.rooms.forEach((room) => {
        room.selected = true;
        this.selectedRoomID = room.id;
        this.api
          .getAvailableSlots(room.id, this.dates)
          .subscribe((slots) => (room.timeSlotsByDate = slots));
      });
    });
  }

  roomCounter(roomID: number) {
    const index = this.selectedRooms.indexOf(roomID);
    if (index === -1) {
      this.selectedRooms.push(roomID);
    } else {
      this.selectedRooms.splice(index, 1);
    }
  }

  removeFilters() {
    this.showTimeSlots = false;
    this.selectedRooms = [];
    this.rooms.forEach((room) => {
      room.selected = false;
    });
  }

  displayText(): string {
    const count = this.rooms.filter((room) => room.selected).length;
    return count ? `${count} valda rum` : 'Mötesrum';
  }

  next() {
    // this.api.setSelectedRooms(this.rooms); // only rooms with room.selected = true
    this.router.navigate(['/booking-form']);
  }
}
