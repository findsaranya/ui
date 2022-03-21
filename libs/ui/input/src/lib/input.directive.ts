import { Directive, HostBinding, Input } from '@angular/core';
@Directive({
  selector: 'input[ttInput], textarea[ttInput]',
})
export class InputDirective {
  @HostBinding('class')
  get className(): string {
    return 'ttui-input';
  }
}
