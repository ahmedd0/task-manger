import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: 'button[appBtn], a[appBtn]',
})
export class Btn implements OnInit {
  @Input('color') color: string = 'bg-purple-600';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const classes = `
      ${this.color} text-white px-4 py-2 rounded-md flex items-center justify-center font-medium hover:opacity-90 transition-all duration-200
    `;

    this.renderer.setAttribute(
      this.el.nativeElement,
      'class',
      `${this.el.nativeElement.className} ${classes}`
    );
  }
}
