import {
  TemplateRef,
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmDone',
  templateUrl: './confirmDone.component.html',
  styleUrls: ['./confirmDone.component.css']
})
export class ConfirmDoneComponent implements OnInit {
  @Output() accepted = new EventEmitter<boolean>();
  modalRef: BsModalRef;

  ngOnInit() {}

  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm() {
    this.accepted.emit(true);
    this.modalRef.hide();
  }

  decline() {
    this.accepted.emit(false);
    this.modalRef.hide();
  }
}
