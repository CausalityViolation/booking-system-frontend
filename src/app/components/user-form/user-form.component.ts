import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Selected } from '../../models/selected';
import { ApiService } from '../../services/api.service';
import { ModalService } from '../../services/modal.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ConfirmationModalComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  selected: Selected = new Selected();
  success = false;
  constructor(
    public router: Router,
    private apiService: ApiService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.apiService.selected$.subscribe((selected) => {
      this.selected = selected;
    });
  }

  confirmBooking() {
    this.apiService.bookSlot(this.selected).subscribe({
      next: (success) => {
        if (success) {
          this.modalService.open('booking-confirmed');

          //Reroutes to the landing page when booking is completed. Probably should add a timer later. 
          setTimeout(() => {
            this.router.navigate(['']);
          }, 4000);
        } else {
          console.log('Booking failed!/Room/Timeslot already taken');
        }
      },
      //Maybe write some smart error message in the backend here
      error: (err) => {
        console.error('Booking failed', err);
      },
    });
  }
}
