import {Component, OnInit} from '@angular/core';
import {trim} from 'lodash';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

import {AccountService} from './account.service';
import {RequestFailedModalComponent} from '../shared/request-failed-modal/request-failed-modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  newPassword: string;
  newPasswordRepeat: string;
  faPaperPlane = faPaperPlane;
  requestFailedModalRef: BsModalRef;

  get formValid(): boolean {
    const trimmedNewPassword = trim(this.newPassword);
    const trimmedNewPasswordRepeat = trim(this.newPasswordRepeat);
    return trimmedNewPassword && trimmedNewPasswordRepeat && trimmedNewPassword === trimmedNewPasswordRepeat;
  }

  constructor(private accountService: AccountService, private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.accountService.updateAccount(this.newPassword).subscribe(() => {
      this.resetForm();
    }, e => {
      this.requestFailedModalRef = this.modalService.show(RequestFailedModalComponent, {
        initialState: {
          message: 'Ошибка обновления пароля.'
        }
      });
      console.error(e);
    });
  }

  resetForm() {
    this.newPassword = null;
    this.newPasswordRepeat = null;
  }

}
