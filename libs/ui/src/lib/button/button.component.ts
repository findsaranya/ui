import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

const HOST_BUTTON_ATTRIBUTES = [
  'tt-btn-primary',
  'tt-btn-secondary',
  'tt-btn-transparent',
  'tt-btn-ghost',
  'tt-btn-warning',
  'tt-btn-outline',
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
  button[tt-btn-warning],
  button[tt-btn-outline]
  `,
  exportAs: 'tt-button',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input()
  set size(value: Sizes) {
    this._size = value;
  }
  get size(): Sizes {
    return this._size;
  }
  private _size: Sizes = 'md';

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  @Input()
  set btnBlock(value: boolean) {
    this._btnBlock = value;
  }
  get btnBlock(): boolean {
    return this._btnBlock;
  }
  private _btnBlock = false;

  @HostBinding('disabled') get hasDisabled() {
    return this.disabled || null;
  }

  @HostBinding('class') get className() {
    return [
      'tt-btn',
      HOST_BUTTON_SIZES[this.size],
      this.btnBlock ? 'tt-btn-block' : '',
      this.hostAttribute,
    ].join(' ');
  }

  constructor(private elementRef: ElementRef) {}

  get hostAttribute(): string {
    let hostattr = '';
    for (const attr of HOST_BUTTON_ATTRIBUTES) {
      if (this.hasHostAttributes(attr)) {
        hostattr = attr;
      }
    }
    return hostattr;
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
