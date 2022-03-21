import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'tt-label',
})
export class LabelDirective {
  @HostBinding('class')
  get className(): string {
    return ['ttui-form-field-label', 'ttui-text-input'].join(' ');
  }
}
