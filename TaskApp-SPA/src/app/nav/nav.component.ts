import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TextFormatService } from '../_services/textFormat.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: any = {};
  username: string;
  modalRef: BsModalRef;

  constructor(
    public authService: AuthService,
    private modalService: BsModalService,
    private textFormatService: TextFormatService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    //this.logout();
    if(this.authService.loggedIn())
    this.username = this.textFormatService.formatUserName(
      this.authService.decodedToken.unique_name
    );
  }

  login(template: TemplateRef<any>) {
    this.authService.login(this.user).subscribe(
      response => {
        this.user.username = this.textFormatService.formatUserName(
          this.user.username
        )
        this.username = this.user.username;
        this.alertifyService.success('Zalogowałeś się!');
      },
      error => {
        //this.openModal(template);
        this.user.password = '';
        this.alertifyService.error('Wystąpił problem')
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');

    localStorage.removeItem('username');
    this.user = {};
    this.alertifyService.message('Wylogowałeś się!');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
