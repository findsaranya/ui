import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

const HOST_BUTTON_ATTRIBUTES = [
  'tt-btn-primary',
  'tt-btn-secondary',
  'tt-btn-transparent',
  'tt-btn-ghost',
  'tt-btn-warning',
];

const HOST_BUTTON_SIZES = {
  md: 'tt-md',
  sm: 'tt-sm',
  lg: 'tt-lg',
};

type Sizes = 'md' | 'sm' | 'lg';
@Component({
  selector: `
  button[tt-btn-primary],
  button[tt-btn-secondary],
  button[tt-btn-transparent],
  button[tt-btn-ghost],
  button[tt-btn-warning]
  `,
  exportAs: 'tt-button',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input()
  set size(value: Sizes) {
    this._size = value;
  }
  get size(): Sizes {
    return this._size;
  }
  protected _size: Sizes = 'md';

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }
  get disabled(): boolean {
    return this._disabled;
  }
  protected _disabled = false;

  @HostBinding('disabled') disable?: boolean | null;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const classList = this.getHostElement().classList;
    if (changes['size'] && !changes.size.firstChange) {
      classList.replace(
        'tt-' + changes?.size.previousValue,
        'tt-' + changes?.size.currentValue
      );
    }
    if (changes['disabled'] && !changes.disabled.firstChange) {
      this.disable = changes?.disabled.currentValue || null;
    }
  }

  ngOnInit(): void {
    this.disable = this.disabled || null;
    for (const attr of HOST_BUTTON_ATTRIBUTES) {
      if (this.hasHostAttributes(attr)) {
        this.getHostElement().classList.add(
          'tt-btn',
          attr,
          HOST_BUTTON_SIZES[this.size]
        );
      }
    }
  }

  getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  hasHostAttributes(...attributes: string[]): boolean {
    return attributes.some((attribute) =>
      this.getHostElement().hasAttribute(attribute)
    );
  }
}
