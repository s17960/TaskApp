import { TemplateRef, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmDelete',
  templateUrl: './confirmDelete.component.html',
  styleUrls: ['./confirmDelete.component.css']
})

export class ConfirmDeleteComponent implements OnInit {
  @Output() accepted = new EventEmitter<boolean>();

  ngOnInit() {
  }

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

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