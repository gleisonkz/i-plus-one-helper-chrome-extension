import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective implements AfterViewInit {
  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {
    const value = this.element.nativeElement.innerHTML;
    this.element.nativeElement.innerHTML = value.replace(
      /\[word\]/,
      '<mark>[word]</mark>'
    );
  }
}
