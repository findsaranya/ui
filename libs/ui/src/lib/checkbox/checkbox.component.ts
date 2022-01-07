import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'tt-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements ControlValueAccessor {
  constructor(private changeDetector: ChangeDetectorRef) {}

  @Input()
  set checked(value: boolean) {
    this._checked = !!(value ?? false);
  }
  get checked(): boolean {
    return this._checked;
  }
  private _checked = false;

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  @Input()
  set required(value: boolean) {
    this._required = value;
  }
  get required(): boolean {
    return this._required;
  }
  private _required = false;

  @Input()
  set id(value: string | null) {
    this._id = value;
  }
  get id(): string | null {
    return this._id;
  }
  private _id: string | null = null;

  @Input()
  set name(value: string | null) {
    this._name = value;
  }
  get name(): string | null {
    return this._name;
  }
  private _name: string | null = null;

  @Input()
  set value(value: string | null) {
    this._value = value;
  }
  get value(): string | null {
    return this._value;
  }
  private _value: string | null = null;

  @Output() valueChange = new EventEmitter<boolean>();

  @ViewChild('input') inputElement?: ElementRef<HTMLInputElement>;

  tabIndex = '0';

  onChange: (value: boolean) => void = () => {};

  onTouch: (value: boolean) => void = () => {};

  toggle(): void {
    this.checked = !this.checked;
  }

  private emitChangeEvent(): void {
    this.valueChange.emit(this.checked);
    this.onChange(this.checked);
    if (this.inputElement) {
      this.inputElement.nativeElement.checked = this.checked;
    }
  }

  onClick(event: Event): void {
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.toggle();
    this.emitChangeEvent();
  }

  writeValue(value: boolean): void {
    this.checked = value;
    this.changeDetector.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: boolean) => void): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
