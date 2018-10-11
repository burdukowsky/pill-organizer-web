import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AutoScrollIfOverflowDirective} from './auto-scroll-if-overflow.directive';
import {RequestFailedModalComponent} from './request-failed-modal/request-failed-modal.component';
import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component';
import {BlackListValidatorDirective} from './black-list-validator.directive';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [AutoScrollIfOverflowDirective, RequestFailedModalComponent, ConfirmModalComponent, BlackListValidatorDirective],
  exports: [AutoScrollIfOverflowDirective, BlackListValidatorDirective],
  entryComponents: [RequestFailedModalComponent, ConfirmModalComponent]
})
export class SharedModule {
}
