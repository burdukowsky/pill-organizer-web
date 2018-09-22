import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AutoScrollIfOverflowDirective} from './auto-scroll-if-overflow.directive';
import {RequestFailedModalComponent} from './request-failed-modal/request-failed-modal.component';
import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [AutoScrollIfOverflowDirective, RequestFailedModalComponent, ConfirmModalComponent],
  exports: [AutoScrollIfOverflowDirective],
  entryComponents: [RequestFailedModalComponent, ConfirmModalComponent]
})
export class SharedModule {
}
