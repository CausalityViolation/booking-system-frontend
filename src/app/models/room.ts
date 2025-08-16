import { TimeSlot } from './timeslot';

export class Room {
  id: number = 0;
  name: string = '';
  capacity: number = 0;
  selected: boolean = false;
  timeSlotsByDate: { date: string; slots: TimeSlot[] }[] = [];
}
