import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TextFormatService } from '../_services/textFormat.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any = {};
  registerModal: BsModalRef;
  message: string;
  modalClassTemplate = 'modal-body modalTextSize ';
  modalClass: string;

  constructor(
    private authService: AuthService,
    private modalService: BsModalService,
    private textFormatService: TextFormatService
  ) {}

  ngOnInit() {}

  register(template: TemplateRef<any>) {
    this.authService.register(this.user).subscribe(
      () => {
        this.message =
          'Witaj ' + this.textFormatService.formatUserName(this.user.username) + '! Zarejestrowałeś się pomyślnie!';
        this.modalClass = this.modalClassTemplate + 'successModal';
        this.openModal(template);
        this.user = {};
      },
      error => {
        this.message = 'Niestety jest już taki użytkownik w bazie.';
        this.modalClass = this.modalClassTemplate + 'failModal';
        this.openModal(template);
        this.user = {};
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.registerModal = this.modalService.show(template);
  }
}
