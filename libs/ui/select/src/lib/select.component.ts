import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Self,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  OptionComponent,
  TTOptionSelectionChange,
} from '@findsaranya/ui/option';
import {
  defer,
  merge,
  Observable,
  startWith,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { NgControl, Validators } from '@angular/forms';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  BooleanInput,
  coerceBooleanProperty,
  coerceNumberProperty,
  NumberInput,
} from '@angular/cdk/coercion';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { OPTION_PARENT } from '@findsaranya/ui/option';
import { v4 as uid } from 'uuid';
export class TTSelectChange {
  constructor(public source: SelectComponent, public value: any) {}
}
@Component({
  selector: 'tt-select',
  templateUrl: './select.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./select.component.scss'],
  providers: [{ provide: OPTION_PARENT, useExisting: SelectComponent }],
})
export class SelectComponent implements OnInit, OnDestroy, AfterContentInit {
  private _selectedOption?: OptionComponent;
  private readonly destroy$ = new Subject<void>();
  private _selectionModel: SelectionModel<OptionComponent> | null = null;

  get focused(): boolean {
    return this._focused;
  }
  set focused(val: boolean) {
    this._focused = val;
  }
  private _focused = false;
  get panelOpen() {
    return this._panelOpen;
  }
  set panelOpen(value: boolean) {
    this._panelOpen = value;
  }
  private _panelOpen = false;

  triggerRect?: ClientRect;

  keyManager?: ActiveDescendantKeyManager<OptionComponent>;

  @ViewChild('trigger', { static: true }) trigger?: ElementRef;

  @ContentChildren(OptionComponent, { descendants: true })
  _options?: QueryList<OptionComponent>;

  @HostBinding('attr.id') id = `tt-select-${uid()}`;

  @HostBinding('class') class = 'ttui-select';
  @Input()
  get required(): boolean {
    return !!(
      this._required ||
      this._ngControl?.control?.hasValidator(Validators.required)
    );
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  private _required: boolean | undefined;

  @Input()
  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value ?? undefined;
  }
  private _name: string | undefined = undefined;

  @Input()
  get multiple(): boolean {
    return this._multiple;
  }
  set multiple(val: BooleanInput) {
    this._multiple = coerceBooleanProperty(val);
  }
  private _multiple = false;

  @Input()
  get value(): string | string[] {
    return this._value;
  }
  set value(newValue: string | string[]) {
    if (
      newValue !== this._value ||
      (this._multiple && Array.isArray(newValue))
    ) {
      if (this._options) {
        this.setSelectionByValue(newValue);
      }

      this._value = newValue;
    }
  }
  private _value: string | string[] = this.multiple ? [] : '';

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(val: BooleanInput) {
    this._disabled = coerceBooleanProperty(val);
  }
  private _disabled = false;

  @Input()
  get tabIndex(): number {
    return this.disabled ? -1 : this._tabIndex;
  }
  set tabIndex(val: NumberInput) {
    this._tabIndex = val != null ? coerceNumberProperty(val) : 0;
  }

  private _tabIndex = 0;

  readonly optionSelectionChanges: Observable<TTOptionSelectionChange> = defer(
    () => {
      const options = this._options;
      if (options) {
        return options.changes.pipe(
          startWith(options),
          switchMap(() =>
            merge(...options.map((option) => option.SelectionChange))
          )
        );
      }

      return this._ngZone.onStable.pipe(
        take(1),
        switchMap(() => this.optionSelectionChanges)
      );
    }
  );

  get empty(): boolean {
    return !this._selectionModel || this._selectionModel.isEmpty();
  }

  get selectedOption(): OptionComponent | null {
    return this._selectedOption ? this._selectedOption : null;
  }

  get selected(): OptionComponent | OptionComponent[] {
    return this.multiple
      ? this._selectionModel?.selected || []
      : (this._selectionModel?.selected[0] as OptionComponent);
  }

  get triggerValue(): string {
    if (this.empty) {
      return '';
    }

    if (this.multiple) {
      const selectedOptions = this._selectionModel?.selected.map(
        (option) => option.viewValue
      );

      return selectedOptions ? selectedOptions.join(', ') : '';
    }

    return this._selectionModel?.selected[0]['viewValue']
      ? this._selectionModel?.selected[0].viewValue
      : '';
  }
  @Output() readonly valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() readonly selectionChange: EventEmitter<TTSelectChange> =
    new EventEmitter<TTSelectChange>();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onChange: (value: string | string[]) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onTouched: () => void = () => {};

  @HostBinding('class.select-disable') get hasDisabled(): boolean {
    return this.disabled;
  }

  @HostBinding('attr.name') get hasName(): string | undefined {
    return this.name;
  }

  @HostBinding('attr.tabindex') get hasIndex(): number {
    return this.tabIndex;
  }
  @HostListener('focus') onFocus(): void {
    if (!this.disabled) {
      this.focused = true;
    }
  }

  @HostListener('blur') onBlur(): void {
    this.focused = false;
    if (!this.disabled) {
      this._onTouched();
      this._changeDetector.markForCheck();
    }
  }

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    @Self() @Optional() protected _ngControl: NgControl,
    private _changeDetector: ChangeDetectorRef,
    private _viewRuler: ViewportRuler,
    private _ngZone: NgZone
  ) {
    if (this._ngControl) {
      this._ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this._selectionModel = new SelectionModel<OptionComponent>(this.multiple);
    this._viewRuler
      .change()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.panelOpen) {
          this.updateRect();
          this._changeDetector.markForCheck();
        }
      });
  }

  ngAfterContentInit(): void {
    this.initKeyManager();
    this._selectionModel?.changed
      .pipe(takeUntil(this.destroy$))
      .subscribe((event) => {
        event.added.forEach((option) => option.select());
        event.removed.forEach((option) => option.deselect());
      });
    this._options?.changes
      .pipe(startWith(null), takeUntil(this.destroy$))
      .subscribe(() => {
        this.onReSelect();
        this.initializeSelection();
      });
  }

  // control value accessor
  writeValue(value: string | string[]): void {
    this.value = value;
  }
  registerOnChange(fn: (value: string | string[]) => void): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onReSelect(): void {
    if (this._options) {
      const changedOrDestroyed = merge(this._options.changes, this.destroy$);

      this.optionSelectionChanges
        .pipe(takeUntil(changedOrDestroyed))
        .subscribe((event) => {
          this.onSelect(event.source as OptionComponent, event.isUserInput);

          if (event.isUserInput && !this.multiple && this._panelOpen) {
            this.close();
            this.focus();
          }
        });
    }
  }

  open(): void {
    if (!this.disabled) {
      if (!this.panelOpen) {
        this.updateRect();
        this.keyManager?.withHorizontalOrientation(null);
        this.panelOpen = true;
      }
    }
  }
  close(): void {
    if (this.panelOpen) {
      this.panelOpen = false;
      this._changeDetector.markForCheck();
    }
  }

  focus(options?: FocusOptions): void {
    this.getHostElement().focus(options);
  }

  getHostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  getChangeEvent(value: string | string[]): TTSelectChange {
    return new TTSelectChange(this, value);
  }
  onSelect(option: OptionComponent, input: boolean): void {
    const wasSelected = this._selectionModel?.isSelected(option);

    if (option.value == null && (this.multiple || !this.multiple)) {
      option.deselect();
      this._selectionModel?.clear();
      if (this.value != null) {
        this.propagateChanges(option.value ? option.value : '');
      }
    } else {
      if (wasSelected !== option.selected) {
        option.selected
          ? this._selectionModel?.select(option)
          : this._selectionModel?.deselect(option);
      }

      if (input) {
        this.keyManager?.setActiveItem(option);
      }

      if (this.multiple) {
        if (input) {
          this.focus();
          this._changeDetector.markForCheck();
        }
      }
      if (wasSelected !== this._selectionModel?.isSelected(option)) {
        this.propagateChanges();
      }
    }
  }
  private updateRect(): void {
    this.triggerRect = this.trigger?.nativeElement.getBoundingClientRect();
  }

  private initKeyManager(): void {
    if (this._options) {
      this.keyManager = new ActiveDescendantKeyManager<OptionComponent>(
        this._options
      )
        .withTypeAhead()
        .withVerticalOrientation()
        .withHorizontalOrientation('ltr')
        .withHomeAndEnd()
        .withAllowedModifierKeys(['shiftKey']);

      this.keyManager.tabOut.pipe(takeUntil(this.destroy$)).subscribe(() => {
        if (this.panelOpen) {
          this.focus();
          this.close();
        }
      });
    }
  }
  private initializeSelection(): void {
    Promise.resolve().then(() => {
      this.setSelectionByValue(this._ngControl?.value || this.value);
    });
  }

  private setSelectionByValue(value: string | string[]): void {
    this._selectionModel?.selected.forEach((option) =>
      option.setInactiveStyles()
    );
    this._selectionModel?.clear();
    if (this.multiple && value) {
      if (!Array.isArray(value)) {
        throw new Error('Value must be array');
      }

      value.forEach((currentValue: any) => {
        const eachOption = this.selectValue(currentValue);
        if (eachOption) {
          this.onSelect(eachOption, false);
        }
      });
    } else {
      const correspondingOption = this.selectValue(value as string);
      if (correspondingOption) {
        this.onSelect(correspondingOption, false);
        this.keyManager?.updateActiveItem(correspondingOption);
      } else if (!this.panelOpen) {
        this.keyManager?.updateActiveItem(-1);
      }
    }

    this._changeDetector.markForCheck();
  }

  private selectValue(value: string): OptionComponent | undefined {
    const optionsArr = this._options ? this._options.toArray() : [];
    const correspondingOption = optionsArr.find((option: OptionComponent) => {
      return (
        option.value === value && !this._selectionModel?.isSelected(option)
      );
    });
    if (correspondingOption) {
      this._selectionModel?.select(correspondingOption);
    }
    return correspondingOption;
  }

  private propagateChanges(fallbackValue = ''): void {
    let valueToEmit: string | string[] = '';

    if (this.multiple) {
      valueToEmit = (this.selected as OptionComponent[]).map(
        (option) => option.value
      ) as string[];
    } else {
      valueToEmit = this.selected
        ? ((this.selected as OptionComponent).value as string)
        : fallbackValue;
    }

    this._value = valueToEmit;
    this.valueChange.emit(valueToEmit);

    this._onChange(valueToEmit);
    this.selectionChange.emit(this.getChangeEvent(valueToEmit));
    this._changeDetector.markForCheck();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this._selectionModel?.clear();
  }
}
