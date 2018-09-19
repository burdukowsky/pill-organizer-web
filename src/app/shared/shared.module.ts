import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AutoScrollIfOverflowDirective} from './auto-scroll-if-overflow.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AutoScrollIfOverflowDirective],
  exports: [AutoScrollIfOverflowDirective]
})
export class SharedModule {
}
