import {
  Component,
  ViewEncapsulation,
  Inject,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { ModalRef, TT_MODAL_DATA } from '@tt-webapp/ui/modal';

type ButtonType =
  | 'primary'
  | 'secondary'
  | 'transparent'
  | 'ghost'
  | 'warning'
  | 'outline';

export interface IPromptModel {
  title: string;
  label?: string;
  body: string;
  primaryButton: string;
  secondaryButton: string;
  primaryButtonType: ButtonType;
  secondaryButtonType: ButtonType;
}

export enum ButtonClass {
  TTUI_LG = 'ttui-lg',
  TTUI_BTN = 'ttui-btn',
  HYPHEN = '-',
}
@Component({
  selector: 'tt-prompt-modal',
  templateUrl: './prompt-modal.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PromptModalComponent implements OnInit {
  @ViewChild('primaryButton', { static: true })
  primaryButton!: ElementRef<HTMLDivElement>;
  @ViewChild('secondaryButton', { static: true })
  secondaryButton!: ElementRef<HTMLDivElement>;

  get data(): IPromptModel {
    return this._data;
  }

  constructor(
    private modalRef: ModalRef,
    @Inject(TT_MODAL_DATA) private _data: IPromptModel
  ) {}

  ngOnInit(): void {
    this.primaryButton?.nativeElement.classList.add(
      ButtonClass.TTUI_BTN + ButtonClass.HYPHEN + this.data.primaryButtonType,
      ButtonClass.TTUI_BTN,
      ButtonClass.TTUI_LG
    );
    this.secondaryButton?.nativeElement.classList.add(
      ButtonClass.TTUI_BTN + ButtonClass.HYPHEN + this.data.secondaryButtonType,
      ButtonClass.TTUI_BTN,
      ButtonClass.TTUI_LG
    );
  }

  actionDone(value: string): void {
    this.modalRef.close(value);
  }
}
