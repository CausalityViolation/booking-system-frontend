import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RoomSelectionComponent } from './components/room-selection/room-selection.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'rooms', component: RoomSelectionComponent },
  { path: 'confirm-user', component: UserFormComponent },
  { path: '**', redirectTo: '' },
];
