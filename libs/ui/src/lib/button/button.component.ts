import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

const HOST_BUTTON_ATTRIBUTES = [
  'tt-primary-btn',
  'tt-secondary-btn',
  'tt-transparent-btn',
  'tt-ghost-btn',
  'tt-warning-btn',
];

const HOST_BUTTON_SIZES = {
  md: 'tt-md',
  sm: 'tt-sm',
  lg: 'tt-lg',
};

type Sizes = 'md' | 'sm' | 'lg';
@Component({
  selector: `
  button[tt-primary-btn],
  button[tt-secondary-btn],
  button[tt-transparent-btn],
  button[tt-ghost-btn],
  button[tt-warning-btn]
  `,
  exportAs: 'tt-button',
  template: ` <ng-content></ng-content>
  `,
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input()
  set size(value: Sizes) {
    this._size = value;
  }
  get size(): Sizes {
    return this._size;
  }
  protected _size: Sizes = 'md';

  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }
  get disabled(): boolean {
    return this._disabled;
  }
  protected _disabled = false;

  //@HostBinding('disabled') disable?: boolean | null;
@HostBinding('disabled')
get disable(){
  return this._disabled;
}
  constructor(private elementRef: ElementRef) {
    console.log("constructor!!")
  }
  toggle(){
    alert("clicked")
    if(this.size == 'md'){
      this.size='sm'
    }else{
      this.size="md";
    }
    //this.size = 'lg' || 'sm';
  }
  ngOnChanges(changes:SimpleChanges){
    console.log();
    
        this.getHostElement().classList.toggle(HOST_BUTTON_SIZES[this.size]);  
  }
  // ngDoCheck(): void {
  //   console.log("docheck")
  //   //console.log("disable",this.disable);
  //   console.log(this.size);
  //   this.getHostElement().classList.toggle(HOST_BUTTON_SIZES[this.size]);
  //   //this.disable = this.disabled || null;
    
  // }
  
  ngOnInit(): void {
    console.log("ngoninit")
    for (const attr of HOST_BUTTON_ATTRIBUTES) {
      if (this.hasHostAttributes(attr)) {
        this.getHostElement().classList.add(
          'tt-btn',
          attr,
          HOST_BUTTON_SIZES[this.size]
        );
      }
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
  hasHostContainsClass(className:string):boolean{
    return this.getHostElement().classList.contains(className);
  }
}
