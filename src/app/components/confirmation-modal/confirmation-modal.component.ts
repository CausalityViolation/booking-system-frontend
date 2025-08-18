import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class ConfirmationModalComponent implements AfterViewInit, OnDestroy {
  @Input()
  public id = '';
  @Input()
  public backgroundColor = 'white';

  @ViewChild('background')
  element: ElementRef | undefined;

  isShowing = false;

  constructor(private modalService: ModalService) {}
  ngAfterViewInit(): void {
    this.modalService.register(this);
  }

  ngOnDestroy(): void {
    if (!this.id) {
      return;
    }
    this.modalService.remove(this.id);
    document.body.classList.remove('modal-open');
  }

  show(): void {
    this.isShowing = true;
    document.body.classList.add('modal-open');
  }

  dismiss(): void {
    this.isShowing = false;
    document.body.classList.remove('modal-open');
  }
}
