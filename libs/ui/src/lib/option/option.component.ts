import {
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  Optional,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { Highlightable } from '@angular/cdk/a11y';

import { mixinDisabled } from './disable';
import { OPTION_PARENT, ParentOption } from './parent-option';

let uniqueIdValue = 0;
export class TTOptionSelectionChange {
  constructor(public source: TTOptionBase, public isUserInput = false) {}
}

const TTMixinOptionBase = mixinDisabled(class {});

@Directive()
export class TTOptionBase extends TTMixinOptionBase implements Highlightable {
  get active(): boolean {
    return this._active;
  }
  set active(val: boolean) {
    this._active = val;
  }
  private _active = false;

  @Input()
  set value(optionVal: string | null) {
    this._value = optionVal;
  }
  get value(): string | null {
    return this._value ? this._value : null;
  }
  private _value: string | null = null;

  @Input()
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: BooleanInput) {
    this._selected = coerceBooleanProperty(value);
  }
  private _selected = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  @Input()
  set id(value: string) {
    this._id = `tt-option-${value}`;
  }
  get id(): string {
    return this._id;
  }
  private _id = `tt-option-${++uniqueIdValue}`;

  @Output() readonly SelectionChange =
    new EventEmitter<TTOptionSelectionChange>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private changeDetector: ChangeDetectorRef,
    private _parent: ParentOption
  ) {
    super();
  }

  get multiple() {
    return this._parent && this._parent.multiple;
  }
  get viewValue(): string {
    return (this.getHostElement().textContent || '').trim();
  }
  getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
  setActiveStyles(): void {
    if (!this.active) {
      this.active = true;
      this.changeDetector.markForCheck();
    }
  }

  setInactiveStyles(): void {
    if (this.active) {
      this.active = false;
      this.changeDetector.markForCheck();
    }
  }
  getLabel(): string {
    return this.viewValue;
  }

  focus(options?: FocusOptions) {
    this.getHostElement().focus(options);
  }
  select(): void {
    if (!this.selected && this.value) {
      this.selected = true;
      this.changeDetector.markForCheck();
      this._emitSelectionChangeEvent();
    }
  }

  deselect(): void {
    if (this.selected) {
      this.selected = false;
      this.changeDetector.markForCheck();
      this._emitSelectionChangeEvent();
    }
  }

  private _emitSelectionChangeEvent(isUserInput = false): void {
    this.SelectionChange.emit(new TTOptionSelectionChange(this, isUserInput));
  }
  _selectViaInteraction(): void {
    if (!this.disabled && this.value) {
      this.selected = !this.selected;
      this.changeDetector.markForCheck();
      this._emitSelectionChangeEvent(true);
    }
  }
}
@Component({
  selector: 'tt-option',
  templateUrl: './option.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent extends TTOptionBase {
  constructor(
    elementRef: ElementRef,
    changeDetector: ChangeDetectorRef,
    @Optional() @Inject(OPTION_PARENT) parent: ParentOption
  ) {
    super(elementRef, changeDetector, parent);
  }

  @HostBinding('class.selected')
  get hasSelected() {
    return this.selected;
  }
  @HostBinding('class.active')
  get activeOption() {
    return this.active;
  }

  @HostBinding('class.multiple')
  get hasMultiple() {
    return this.multiple;
  }

  @HostBinding('id') get getOptionId(): string {
    return this.id;
  }

  @HostBinding('attr.tabindex') get tabIndex(): string {
    return this.disabled ? '-1' : '0';
  }

  @HostBinding('class.ttui-option-disabled') get getOptDisabled() {
    return this.disabled;
  }
  @HostBinding('class') class = 'ttui-option';

  @HostListener('click', ['$event']) onSelect(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled) {
      this._selectViaInteraction();
    }
  }
}
