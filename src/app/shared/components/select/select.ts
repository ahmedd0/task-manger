import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  forwardRef,
  Inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

export interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.html',
  styleUrls: ['./select.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiSelectComponent),
      multi: true,
    },
  ],
})
export class UiSelectComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = 'Select...';
  disabled: boolean = false;

  @Input() value: string | null = null;
  @Output() valueChange = new EventEmitter<string | null>();

  @ViewChild('triggerBtn') triggerBtn!: ElementRef<HTMLButtonElement>;

  isOpen = false;
  activeIndex: number = -1;
  private onChange: (_: string | null) => void = () => {};
  private onTouched: () => void = () => {};

  private removeCaptureListener?: () => void;

  constructor(
    private host: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private documentRef: Document
  ) {}
  ngOnInit(): void {
    // Capture-phase listener ensures we get the click even if someone stops propagation
    const handler = (event: Event) => {
      if (!this.isOpen) return;
      const target = event.target as Node;
      if (!this.host.nativeElement.contains(target)) {
        this.close();
        this.onTouched();
      }
    };
    this.documentRef.addEventListener('click', handler, true);
    this.removeCaptureListener = () =>
      this.documentRef.removeEventListener('click', handler, true);
  }

  get selectedLabel(): string {
    const found = this.options.find((o) => o.value === this.value);
    return found ? found.label : this.placeholder;
  }

  toggleOpen(): void {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.syncActiveIndex();
      setTimeout(() => this.scrollActiveIntoView(), 0);
    }
  }

  open(): void {
    if (this.disabled) return;
    this.isOpen = true;
    this.syncActiveIndex();
    setTimeout(() => this.scrollActiveIntoView(), 0);
  }

  close(): void {
    this.isOpen = false;
    this.activeIndex = -1;
  }

  selectOption(opt: SelectOption, index: number): void {
    if (this.disabled) return;
    this.value = opt.value;
    this.valueChange.emit(this.value);
    this.onChange(this.value);
    this.activeIndex = index;
    this.close();
    // Return focus to trigger for accessibility
    this.triggerBtn?.nativeElement?.focus();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;
    switch (event.key) {
      case 'Enter':
      case ' ': // Space
        event.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else if (this.activeIndex >= 0) {
          this.selectOption(this.options[this.activeIndex], this.activeIndex);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) this.open();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) this.open();
        this.moveActive(-1);
        break;
      case 'Escape':
        if (this.isOpen) {
          event.preventDefault();
          this.close();
        }
        break;
    }
  }

  private moveActive(delta: number): void {
    if (!this.options.length) return;
    const max = this.options.length - 1;
    if (this.activeIndex === -1) {
      this.activeIndex = Math.max(0, Math.min(max, delta > 0 ? 0 : max));
    } else {
      this.activeIndex = Math.max(0, Math.min(max, this.activeIndex + delta));
    }
    this.scrollActiveIntoView();
  }

  private syncActiveIndex(): void {
    const idx = this.options.findIndex((o) => o.value === this.value);
    this.activeIndex = idx;
  }

  private scrollActiveIntoView(): void {
    const container: HTMLElement | null = this.host.nativeElement.querySelector(
      '[data-options-container]'
    );
    const active: HTMLElement | null = this.host.nativeElement.querySelector(
      '[data-option].active'
    );
    if (container && active) {
      const containerRect = container.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      if (activeRect.top < containerRect.top) {
        container.scrollTop -= containerRect.top - activeRect.top;
      } else if (activeRect.bottom > containerRect.bottom) {
        container.scrollTop += activeRect.bottom - containerRect.bottom;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {}

  // ControlValueAccessor
  writeValue(value: string | null): void {
    this.value = value;
    this.syncActiveIndex();
  }

  registerOnChange(fn: (_: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy(): void {
    this.removeCaptureListener?.();
  }
}
