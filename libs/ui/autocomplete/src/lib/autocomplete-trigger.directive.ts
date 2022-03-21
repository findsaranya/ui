import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ConnectedPosition,
  ConnectionPositionPair,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TTOptionSelectionChange, TTOptionBase } from '@tt-webapp/ui/option';
import {
  defer,
  delay,
  filter,
  fromEvent,
  map,
  merge,
  Observable,
  of,
  startWith,
  Subject,
  Subscription,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { AutocompleteComponent } from './autocomplete.component';

export const TT_AUTOCOMPLETE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutocompleteTriggerDirective),
  multi: true,
};
@Directive({
  selector: 'input[ttAutocomplete],textarea[ttAutocomplete]',
  providers: [TT_AUTOCOMPLETE_VALUE_ACCESSOR],
})
export class AutocompleteTriggerDirective
  implements OnDestroy, ControlValueAccessor
{
  private overlayRef: OverlayRef | null = null;
  private portal?: TemplatePortal;
  private viewportSubscription = Subscription.EMPTY;
  private readonly destroy$ = new Subject<void>();
  readonly optionSelectionChanges: Observable<TTOptionSelectionChange> = defer(
    () => {
      const options = this.ttAutocomplete ? this.ttAutocomplete?.options : null;
      if (options) {
        return options.changes.pipe(
          startWith(options),
          switchMap(() =>
            merge(...options.map((option) => option.SelectionChange))
          )
        );
      }

      return this.ngZone.onStable.pipe(
        take(1),
        switchMap(() => this.optionSelectionChanges)
      );
    }
  );
  @Input() ttAutocomplete?: AutocompleteComponent;
  @Input('ttAutocompleteDisabled')
  get autocompleteDisabled(): boolean {
    return this._autocompleteDisabled;
  }
  set autocompleteDisabled(value: BooleanInput) {
    this._autocompleteDisabled = coerceBooleanProperty(value);
  }
  private _autocompleteDisabled = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onTouched: () => void = () => {};

  get panelOpen(): boolean {
    return this.ttAutocomplete ? this.ttAutocomplete?.showPanel : false;
  }
  constructor(
    private host: ElementRef,
    private viewport: ViewportRuler,
    private overlay: Overlay,
    private viewContainer: ViewContainerRef,
    private ngZone: NgZone
  ) {}

  ngOnDestroy(): void {
    this.viewportSubscription.unsubscribe();
    this.destroy$.complete();
  }
  @HostListener('focusin', ['$event'])
  onFocus(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.canOpen()) {
      this.attachOverlay();
    }
  }

  @HostListener('blur') onBlur(): void {
    this._onTouched();
  }
  @HostListener('input', ['$event']) handleInput(event: KeyboardEvent): void {
    this._onChange((event.target as HTMLInputElement).value);
  }
  attachOverlay(): void {
    if (!this.ttAutocomplete) {
      throw new Error(
        'Attempting to open an undefined instance of tt-autocomplete'
      );
    }
    let overlayRef = this.overlayRef;

    if (!overlayRef && this.ttAutocomplete && this.ttAutocomplete['template']) {
      this.portal = new TemplatePortal(
        this.ttAutocomplete?.template,
        this.viewContainer
      );
      overlayRef = this.overlay.create(this.getOverlayConfig());
      this.overlayRef = overlayRef;
      this.overlayClickOutside(this.overlayRef, this.getHost()).subscribe(() =>
        this.closePanel()
      );
      this.viewportSubscription = this.viewport.change().subscribe(() => {
        if (overlayRef && this.panelOpen) {
          overlayRef.updateSize({ width: this.getHostWidth() });
        }
      });
    } else {
      overlayRef?.updateSize({ width: this.getHostWidth() });
    }

    if (overlayRef && !overlayRef.hasAttached()) {
      overlayRef.attach(this.portal);
      this.initalizeSelection();
    }
  }
  private canOpen(): boolean {
    const element = this.host.nativeElement;
    return !element.readOnly && !element.disabled && !this.autocompleteDisabled;
  }
  private initalizeSelection(): void {
    if (this.ttAutocomplete && this.ttAutocomplete['options']) {
      const firstStable = this.ngZone.onStable.pipe(take(1));
      const optionChanges = this.ttAutocomplete.options.changes.pipe(delay(0));
      merge(firstStable, optionChanges)
        .pipe(
          switchMap(() => {
            this.ttAutocomplete?.setVisibility();
            return this.panelClosingActions;
          }),
          take(1)
        )
        .subscribe((event) => this.setValueAndClose(event));
    }
  }
  get panelClosingActions(): Observable<TTOptionSelectionChange | null> {
    return merge(
      this.optionSelectionChanges,
      this.overlayRef
        ? this.overlayClickOutside(this.overlayRef, this.getHost())
        : of(),
      this.overlayRef ? this.overlayRef.detachments() : of()
    ).pipe(
      map((event) => (event instanceof TTOptionSelectionChange ? event : null))
    );
  }
  private setValueAndClose(event: TTOptionSelectionChange | null): void {
    const source = event && event.source;
    if (source) {
      this.clearPreviousSelectedOption(source);
      this.setTriggerValue(source.value);
      this._onChange(source.value as string);
    }

    this.closePanel();
  }
  private setTriggerValue(value: string | null): void {
    if (value) {
      this.host.nativeElement.value = value;
    }
  }

  private clearPreviousSelectedOption(skip: TTOptionBase): void {
    if (this.ttAutocomplete && this.ttAutocomplete['options']) {
      this.ttAutocomplete?.options.forEach((option) => {
        if (option !== skip && option.selected) {
          option.deselect();
        }
      });
    }
  }
  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.getOverlayPosition(),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: this.getHostWidth(),
      maxHeight: 40 * 3,
    });
  }

  private getOverlayPosition(): PositionStrategy {
    const positions = [
      new ConnectionPositionPair(
        { originX: 'start', originY: 'bottom' },
        { overlayX: 'start', overlayY: 'top' },
        0,
        8
      ),
      new ConnectionPositionPair(
        { originX: 'start', originY: 'top' },
        { overlayX: 'start', overlayY: 'bottom' },
        0,
        8
      ),
    ];

    return this.overlay
      .position()
      .flexibleConnectedTo(this.host)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
  }
  private getHostWidth(): string {
    return this.host.nativeElement.getBoundingClientRect().width;
  }

  private closePanel(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
  overlayClickOutside(
    overlayRef: OverlayRef,
    origin: HTMLElement
  ): Observable<Event> {
    return fromEvent<MouseEvent>(document, 'click').pipe(
      filter((event) => {
        const clickTarget = event.target as HTMLElement;
        const notOrigin = clickTarget !== origin;
        const notOverlay =
          !!overlayRef &&
          overlayRef.overlayElement.contains(clickTarget) === false; // the autocomplete
        return notOrigin && notOverlay;
      }),
      takeUntil(overlayRef.detachments())
    );
  }

  getHost(): HTMLElement {
    return this.host.nativeElement;
  }

  writeValue(value: string): void {
    this.setTriggerValue(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.host.nativeElement.disabled = isDisabled;
  }
}
