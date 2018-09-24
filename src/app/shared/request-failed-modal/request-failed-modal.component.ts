import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-request-failed-modal',
  templateUrl: './request-failed-modal.component.html',
  styleUrls: ['./request-failed-modal.component.scss']
})
export class RequestFailedModalComponent implements OnInit {
  message = 'Ошибка запроса.';
  faTimes = faTimes;

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
  }

}
