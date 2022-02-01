import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  RadioButtonValueType,
  RadioGroupDirective,
} from '../radio-group/radio-group.directive';

let nextUniqueId = 0;

@Component({
  selector: 'tt-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent implements OnInit, OnDestroy {
  private uniqueId = `ttui-radio-${++nextUniqueId}`;

  @Input() id: string = this.uniqueId;

  @Input() name = '';

  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    if (this._checked !== value) {
      this._checked = value;
      if (value && this.radioGroup?.value !== this.value) {
        this.radioGroup.selected = this;
      } else if (!value && this.radioGroup?.value === this.value) {
        this.radioGroup.selected = null;
      }

      if (value) {
        this.radioDispatcher.notify(this.id, this.name);
      }
      this.changeDetector.markForCheck();
    }
  }
  private _checked = false;

  @Input()
  get value(): RadioButtonValueType {
    return this._value;
  }
  set value(value: RadioButtonValueType) {
    if (this._value !== value) {
      this._value = value;
      if (this.radioGroup !== null) {
        if (!this.checked) {
          this.checked = this.radioGroup.value === value;
        } else {
          this.radioGroup.selected = this;
        }
      }
    }
  }
  private _value: RadioButtonValueType = null;

  @Input()
  get disabled(): boolean {
    return (
      this._disabled || (this.radioGroup !== null && this.radioGroup.disabled)
    );
  }
  set disabled(value: boolean) {
    this.setDisabled(value);
  }
  private _disabled = false;

  @Input()
  get required(): boolean {
    return this._required || (this.radioGroup && this.radioGroup.required);
  }
  set required(value: boolean) {
    this._required = value;
  }
  private _required = false;

  get inputId(): string {
    return `${this.id || this.uniqueId}-input`;
  }

  @Output() readonly valueChange: EventEmitter<RadioButtonValueType> =
    new EventEmitter<RadioButtonValueType>();

  @ViewChild('input') inputElement!: ElementRef<HTMLInputElement>;

  tabIndex = '0';

  constructor(
    private radioGroup: RadioGroupDirective<RadioButtonComponent>,
    private radioDispatcher: UniqueSelectionDispatcher,
    protected changeDetector: ChangeDetectorRef
  ) {
    this.removeUniqueSelectionListener = radioDispatcher.listen(
      (id: string, name: string) => {
        if (id !== this.id && name === this.name) {
          this.checked = false;
        }
      }
    );
  }

  @HostBinding('class') get classes(): string {
    return [
      'ttui-radio-button',
      this.checked ? 'ttui-radio-checked' : null,
      this.disabled ? 'ttui-radio-disabled' : null,
    ].join(' ');
  }

  private removeUniqueSelectionListener: () => void = () => {};

  markForCheck(): void {
    this.changeDetector.markForCheck();
  }

  ngOnInit(): void {
    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this.value;

      if (this.checked) {
        this.radioGroup.selected = this;
      }

      this.name = this.radioGroup.name;
    }
  }

  ngOnDestroy(): void {
    this.removeUniqueSelectionListener();
  }

  onChange(): void {
    if (!this.checked && !this.disabled) {
      const groupValueChanged =
        this.radioGroup && this.value !== this.radioGroup.value;
      this.checked = true;
      this.emitChangeEvent();

      if (this.radioGroup) {
        this.radioGroup.onChange(this.value);
        this.radioGroup.onTouch(this.value);
        if (groupValueChanged) {
          this.radioGroup.emitChangeEvent();
        }
      }
    }
  }

  private emitChangeEvent(): void {
    this.valueChange.emit(this.value);
  }

  protected setDisabled(value: boolean): void {
    if (this._disabled !== value) {
      this._disabled = value;
      this.changeDetector.markForCheck();
    }
  }
}
