import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';

type BtnAttr =
  | 'tt-btn-primary'
  | 'tt-btn-secondary'
  | 'tt-btn-transparent'
  | 'tt-btn-ghost'
  | 'tt-btn-warning'
  | 'tt-btn-outline';

const HOST_BUTTON_ATTRIBUTES: Array<BtnAttr> = [
  'tt-btn-primary',
  'tt-btn-secondary',
  'tt-btn-transparent',
  'tt-btn-ghost',
  'tt-btn-warning',
  'tt-btn-outline',
];

type Sizes = 'md' | 'sm' | 'lg';

type BtnSizes = {
  [index in Sizes]: string;
};

const HOST_BUTTON_SIZES: BtnSizes = {
  md: 'tt-md',
  sm: 'tt-sm',
  lg: 'tt-lg',
};
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
  set isBlockElement(value: boolean) {
    this._isBlockElement = value;
  }
  get isBlockElement(): boolean {
    return this._isBlockElement;
  }
  private _isBlockElement = false;

  @HostBinding('disabled') get hasDisabled() {
    return this.disabled || null;
  }

  @HostBinding('class') get className() {
    return [
      'tt-btn',
      HOST_BUTTON_SIZES[this.size],
      this.isBlockElement ? 'tt-btn-block' : '',
      this.hostAttribute(),
    ].join(' ');
  }

  constructor(private elementRef: ElementRef) {}

  hostAttribute(): string {
    const hostattr = HOST_BUTTON_ATTRIBUTES.find((attr) =>
      this.getHostElement().hasAttribute(attr)
    );

    return hostattr ? hostattr : '';
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
