import { Injectable } from '@angular/core';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: ConfirmationModalComponent[] = [];

  register(modal: ConfirmationModalComponent): void {
    this.modals.push(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter((m) => m.id !== id);
  }

  open(id: string): void {
    const modal: ConfirmationModalComponent | null =
      this.modals.find((m) => m.id === id) ?? null;
    if (modal == null) {
      return;
    }
    modal!.show();
  }

  close(id: string): void {
    const modal: ConfirmationModalComponent | null =
      this.modals.find((m) => m.id === id) ?? null;
    if (modal == null) {
      return;
    }
    modal.dismiss();
  }

  dismiss(): void {
    this.modals.forEach((m) => {
      m.dismiss();
    });
  }
}
