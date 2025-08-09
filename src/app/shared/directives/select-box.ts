import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'select[appSelectBox]',
  standalone: true,
})
export class SelectBox {
  constructor(
    private el: ElementRef<HTMLSelectElement>,
    private renderer: Renderer2
  ) {
    const element = this.el.nativeElement;

    // Base styling
    element.classList.add(
      'w-full',
      'px-4',
      'py-3',
      'border',
      'border-gray-300',
      'rounded-lg',
      'outline-none',
      'focus:ring-2',
      'focus:ring-purple-500',
      'focus:border-transparent',
      'transition-all',
      'duration-200',
      'bg-white',
      'appearance-none',
      'pr-10',
      'cursor-pointer',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed'
    );

    // Custom dropdown arrow using an inline SVG data URI
    const svgArrow = encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="%236b7280"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd"/></svg>`
    );

    this.renderer.setStyle(
      element,
      'backgroundImage',
      `url("data:image/svg+xml,${svgArrow}")`
    );
    this.renderer.setStyle(element, 'backgroundRepeat', 'no-repeat');
    this.renderer.setStyle(
      element,
      'backgroundPosition',
      'right 0.75rem center'
    );
    this.renderer.setStyle(element, 'backgroundSize', '1rem 1rem');
  }
}
