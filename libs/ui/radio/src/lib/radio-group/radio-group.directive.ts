import {
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  EventEmitter,
  forwardRef,
  HostBinding,
  InjectionToken,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonComponent } from '../radio-button.component';

export const TT_RADIO_GROUP = new InjectionToken<
  RadioGroupDirective<RadioButtonComponent>
>('TTRadioGroup');

let nextUniqueId = 0;

export type RadioButtonValueType = string | number | null;

@Directive({
  selector: 'tt-radio-group',
  exportAs: 'ttRadioGroup',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupDirective),
      multi: true,
    },
    {
      provide: TT_RADIO_GROUP,
      useExisting: RadioGroupDirective,
    },
  ],
})
export class RadioGroupDirective<T extends RadioButtonComponent>
  implements ControlValueAccessor
{
  @Input()
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
    this.updateRadioButtonNames();
  }
  private _name = `ttui-radio-group-${++nextUniqueId}`;

  @Input()
  get value(): RadioButtonValueType {
    return this._value;
  }
  set value(value: RadioButtonValueType) {
    if (this._value !== value) {
      this._value = value;

      this.updateSelectedRadioFromValue();
      this.checkSelectedRadioButton();
    }
  }
  private _value: RadioButtonValueType = null;

  @Input()
  get selected() {
    return this._selected;
  }
  set selected(selected: T | null) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this.checkSelectedRadioButton();
  }
  private _selected: T | null = null;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
    this.markRadiosForCheck();
  }
  private _disabled = false;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = value;
    this.markRadiosForCheck();
  }
  private _required = false;

  @Input()
  get isHorizontal(): boolean {
    return this._horizontal;
  }
  set isHorizontal(value: boolean) {
    this._horizontal = value;
  }
  private _horizontal = false;

  @Output() readonly valueChange: EventEmitter<RadioButtonValueType> =
    new EventEmitter<RadioButtonValueType>();

  @ContentChildren(forwardRef(() => RadioButtonComponent), {
    descendants: true,
  })
  radios!: QueryList<T>;

  @HostBinding('class') get class() {
    return this.isHorizontal
      ? 'ttui-radio-group-horizontal'
      : 'ttui-radio-group';
  }

  constructor(private changeDetector: ChangeDetectorRef) {}

  private updateRadioButtonNames(): void {
    if (this.radios) {
      this.radios.forEach((radio) => {
        radio.name = this.name;
        radio.markForCheck();
      });
    }
  }

  private updateSelectedRadioFromValue(): void {
    const isAlreadySelected =
      this._selected !== null && this._selected.value === this._value;

    if (this.radios && !isAlreadySelected) {
      this._selected = null;
      this.radios.forEach((radio) => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }

  private checkSelectedRadioButton(): void {
    if (this._selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }

  emitChangeEvent(): void {
    this.valueChange.emit(this.value);
  }

  private markRadiosForCheck(): void {
    if (this.radios) {
      this.radios.forEach((radio) => radio.markForCheck());
    }
  }

  onChange: (value: RadioButtonValueType) => void = () => {};

  onTouch: (value: RadioButtonValueType) => void = () => {};

  writeValue(value: RadioButtonValueType): void {
    this.value = value;
    this.changeDetector.markForCheck();
  }

  registerOnChange(fn: (value: RadioButtonValueType) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: RadioButtonValueType) => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.changeDetector.markForCheck();
  }
}
