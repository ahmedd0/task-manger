import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'input[appInput]',
})
export class Input {
  constructor(private el: ElementRef) {
    this.el.nativeElement.classList.add(
      '!border',
      '!border-gray-300',
      'rounded-md',
      'p-2',
      'w-full',
      'px-4',
      'py-3',
      'outline-none',
      'focus:border-purple-500',
      'focus:ring-purple-500',
      'focus:ring-2',

    );
  }
}
