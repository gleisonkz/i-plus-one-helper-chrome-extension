import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective implements AfterViewInit {
  constructor(private element: ElementRef) {}

  ngAfterViewInit(): void {
    const value: string = this.element.nativeElement.innerHTML;
    this.element.nativeElement.innerHTML = value.replace(
      /\[word\]/g,
      '<mark>[word]</mark>'
    );
  }
}
