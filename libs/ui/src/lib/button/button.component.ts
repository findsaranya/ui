import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

const HOST_BUTTON_ATTRIBUTES = [
  'tt-primary-btn',
  'tt-secondary-btn',
  'tt-transparent-btn',
  'tt-ghost-btn',
  'tt-warning-btn',
];
@Component({
  selector: `
  button[tt-primary-btn],
  button[tt-secondary-btn],
  button[tt-transparent-btn],
  button[tt-ghost-btn],
  button[tt-warning-btn]
  `,
  exportAs: 'tt-button',
  template: `
      <ng-content></ng-content>
  `,
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit,AfterViewInit{
  @Input() size : 'md'|'sm'|'lg' = 'md';
  @Input()
  set disabled(value:boolean){
    this._disabled = value;
  }
  protected _disabled = false;

  @HostBinding('disabled') get disable(){
    return this._disabled || null;
  }
  constructor(private elementRef: ElementRef) {}
  
  ngOnInit(): void {
    for (const attr of HOST_BUTTON_ATTRIBUTES) {
      if (this.hasHostAttributes(attr)) {
        this.getHostElement().classList.add(attr,'tt-btn');
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.size === 'md') {
      this.getHostElement().classList.add('tt-md');
      console.log('tt-'+this.size); 
      
    }
  }
  getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  hasHostAttributes(...attributes: string[]) {
    return attributes.some((attribute) =>
      this.getHostElement().hasAttribute(attribute)
    );
  }
 
}
