import {Directive, ElementRef, HostBinding, OnInit} from '@angular/core';

enum ScrollDirection {Left, Right}

@Directive({
  selector: '[appAutoScrollIfOverflow]'
})
export class AutoScrollIfOverflowDirective implements OnInit {
  @HostBinding('style.white-space') whiteSpace = 'nowrap';
  @HostBinding('style.overflow') overflow = 'hidden';

  private animate(el: Element) {
    const distance: number = el.scrollWidth - el.clientWidth;
    const speed = 45;
    const step = 1;
    this.scroll(el, ScrollDirection.Right, speed, distance, step, () => {
      this.scroll(el, ScrollDirection.Left, speed, distance, step, () => {
        this.animate(el);
      });
    });
  }

  private scroll(el: Element, direction: ScrollDirection, speed: number, distance: number, step: number, completeCallback: Function) {
    let scrollAmount = 0;
    const interval = setInterval(function () {
      if (direction === ScrollDirection.Left) {
        el.scrollLeft -= step;
      } else {
        el.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(interval);
        completeCallback();
      }
    }, speed);
  }

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.animate(this.el.nativeElement);
  }
}
