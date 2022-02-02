import {
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'tt-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: [
    './form-field.component.scss',
    '../input/input.directive.scss',
    '../textarea/textarea.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class FormFieldComponent implements OnInit, DoCheck {
  @ContentChild('input', { static: true }) ttInput!: ElementRef;
  charCount = 0;
  isTextarea = false;
  maxLength = 0;
  @Input()
  set isBlockElement(value: boolean) {
    this._isBlockElement = value;
  }
  get isBlockElement(): boolean {
    return this._isBlockElement;
  }
  private _isBlockElement = false;

  private required = false;
  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  @HostBinding('class')
  get className(): string {
    return [
      this.disabled
        ? 'ttui-form-field-disabled'
        : this.required
        ? 'ttui-form-field-required'
        : '',
      this.isBlockElement ? 'block' : 'inline-block',
    ].join(' ');
  }
  ngOnInit(): void {
    if (this.ttInput) {
      this.required = this.ttInput.nativeElement.hasAttribute('required');
      this.maxLength = this.ttInput.nativeElement.maxLength;
      this.isTextarea = this.ttInput.nativeElement.localName === 'textarea';
      if (this.isBlockElement) {
        this.ttInput.nativeElement.classList.add('ttui-input-block');
      }
    }
  }
  ngDoCheck(): void {
    this.charCount = this.ttInput.nativeElement.value.length;
    this.isBlockElement
      ? this.ttInput.nativeElement.classList.add('ttui-input-block')
      : this.ttInput.nativeElement.classList.remove('ttui-input-block');
  }
}
