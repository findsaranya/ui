import { Directive, HostBinding, Input } from '@angular/core';

export type TextareaType = 'auto' | 'packed' | 'resizeable';

@Directive({
  selector: 'textarea[textarea]',
})
export class TextareaDirective {
  @Input('textarea') textareaType: TextareaType = 'auto';

  @HostBinding('class')
  get className(): string {
    return 'ttui-textarea-' + this.textareaType;
  }
}
