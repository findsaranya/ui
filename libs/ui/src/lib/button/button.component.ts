import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

const HOST_BUTTON_ATTRIBUTES = [
  'tt-primaryOne',
  'tt-primaryTwo',
  'tt-secondaryOne',
  'tt-secondaryTwo',
  'tt-withIcon',
];
@Component({
  selector: `
  button[tt-primaryOne],
  button[tt-primaryTwo],
  button[tt-secondaryOne],
  button[tt-secondaryTwo],
  button[tt-withIcon]
  `,
  exportAs: 'tt-button',
  template: `
    <span>
      <ng-content></ng-content>
    </span>
  `,
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() disabled = false;
  @HostBinding('attr.disabled') get getdisabled(): any {
    return this.disabled || null;
  }

  constructor(private elementRef: ElementRef) {
    for (const attr of HOST_BUTTON_ATTRIBUTES) {
      if (this.hasHostAttributes(attr)) {
        this.getHostElement().classList.add(attr);
      }
    }
  }

  getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  hasHostAttributes(...attributes: string[]) {
    return attributes.some((attribute) =>
      this.getHostElement().hasAttribute(attribute)
    );
  }
  onClick(): void {
    alert('btn clicked');
  }
}
