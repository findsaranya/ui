import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewEncapsulation,
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

type BtnClasses = {
  [index in BtnAttr]: string;
};
const HOST_BUTTON_CLASSES: BtnClasses = {
  'tt-btn-primary': 'ttui-btn-primary',
  'tt-btn-ghost': 'ttui-btn-ghost',
  'tt-btn-outline': 'ttui-btn-outline',
  'tt-btn-secondary': 'ttui-btn-secondary',
  'tt-btn-transparent': 'ttui-btn-transparent',
  'tt-btn-warning': 'ttui-btn-warning',
};
const HOST_BUTTON_SIZES: BtnSizes = {
  md: 'ttui-md',
  sm: 'ttui-sm',
  lg: 'ttui-lg',
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
  template: ` <span class="ttui-btn-wrapper"><ng-content></ng-content></span>`,
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
      'ttui-btn',
      HOST_BUTTON_SIZES[this.size],
      this.isBlockElement ? 'ttui-btn-block' : '',
      HOST_BUTTON_CLASSES[this.hostAttribute() as BtnAttr],
    ].join(' ');
  }

  constructor(private elementRef: ElementRef) {}

  hostAttribute(): string {
    const hostattr = HOST_BUTTON_ATTRIBUTES.find((attr) =>
      this.getHostElement().hasAttribute(attr)
    );

    return hostattr ?? '';
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
