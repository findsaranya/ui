import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { OPTION_PARENT, OptionComponent } from '@tt-webapp/ui/option';
import { v4 as uid } from 'uuid';
@Component({
  selector: 'tt-autocomplete',
  template: `
    <ng-template>
      <div class="ttui-autocomplete-panel" role="listbox" #panel>
        <div class="m-3">
          <ng-content></ng-content>
        </div>
      </div>
    </ng-template>
  `,
  styleUrls: ['./autocomplete.component.scss'],
  exportAs: 'ttAutocomplete',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: OPTION_PARENT, useExisting: AutocompleteComponent }],
})
export class AutocompleteComponent implements AfterContentInit {
  showPanel = false;
  get isOpen(): boolean {
    return this._isOpen && this.showPanel;
  }
  private _isOpen = false;

  @Input()
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = `tt-autocomplete-${value}`;
  }
  private _id = `tt-autocomplete-${uid()}`;
  @ViewChild(TemplateRef, { static: true }) template?: TemplateRef<any>;

  @ViewChild('panel') panel?: ElementRef;

  @ContentChildren(OptionComponent, { descendants: true })
  options?: QueryList<OptionComponent>;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    private platform: Platform
  ) {}
  ngAfterContentInit(): void {
    this.setVisibility();
  }

  @HostBinding('attr.id') get uniqueId() {
    return this.id;
  }

  setVisibility(): void {
    this.showPanel = !!this.options;
    this.changeDetector.markForCheck();
  }
}
