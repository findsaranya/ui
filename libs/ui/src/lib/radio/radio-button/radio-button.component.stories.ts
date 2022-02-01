import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { moduleMetadata, Meta } from '@storybook/angular';
import { RadioModule } from '../radio.module';
import { RadioButtonComponent } from './radio-button.component';

export default {
  title: 'Components/RadioButton',
  component: RadioButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RadioModule, FormsModule],
    }),
  ],
} as Meta<RadioButtonComponent>;

export const withValues = (args: RadioButtonComponent) => ({
  template: `
    <tt-radio-group name="ngModel" [(ngModel)]="value" [disabled]="disabled">
      <tt-radio-button value="btn1">Button 1</tt-radio-button>
      <tt-radio-button value="btn2">Button 2</tt-radio-button>
      <tt-radio-button value="btn3">Button 3</tt-radio-button>
      <tt-radio-button value="btn4">Button 4</tt-radio-button>
    </tt-radio-group>
  `,
  props: args,
});
withValues.args = {
  disabled: false,
} as Partial<RadioButtonComponent>;
withValues.storyName = 'With Values';

export const withRequired = (args: RadioButtonComponent) => ({
  template: `
    <span>
      Choose Button <span *ngIf="required" class="text-red-500">*</span>
    </span>
    <tt-radio-group
      name="ngModel"
      [(ngModel)]="value"
      [required]="required"
      [disabled]="disabled"
    >
      <tt-radio-button value="btn1">Button 1</tt-radio-button>
      <tt-radio-button value="btn2">Button 2</tt-radio-button>
      <tt-radio-button value="btn3">Button 3</tt-radio-button>
      <tt-radio-button value="btn4">Button 4</tt-radio-button>
    </tt-radio-group>
  `,
  props: args,
});
withRequired.args = {
  required: true,
  disabled: false,
} as Partial<RadioButtonComponent>;
withRequired.storyName = 'With Required';

export const withDisabled = (args: RadioButtonComponent) => ({
  template: `
    <tt-radio-group name="ngModel" [(ngModel)]="value" [disabled]="group">
      <tt-radio-button [disabled]="button1" value="btn1">Button 1</tt-radio-button>
      <tt-radio-button [disabled]="button2" value="btn2">Button 2</tt-radio-button>
      <tt-radio-button [disabled]="button3" value="btn3">Button 3</tt-radio-button>
      <tt-radio-button [disabled]="button4" value="btn4">Button 4</tt-radio-button>
    </tt-radio-group>
  `,
  props: args,
});
withDisabled.args = {
  group: false,
  button1: false,
  button2: false,
  button3: true,
  button4: false,
} as Partial<RadioButtonComponent>;
withDisabled.storyName = 'With Disabled';

export const withHorizontal = (args: RadioButtonComponent) => ({
  template: `
    <span>
      Choose Button <span *ngIf="required" class="text-red-500">*</span>
    </span>
    <tt-radio-group
      name="ngModel"
      [(ngModel)]="value"
      [required]="required"
      [disabled]="disabled"
      [isHorizontal]="horizontal"
    >
      <tt-radio-button value="btn1">Button 1</tt-radio-button>
      <tt-radio-button value="btn2">Button 2</tt-radio-button>
      <tt-radio-button value="btn3">Button 3</tt-radio-button>
      <tt-radio-button value="btn4">Button 4</tt-radio-button>
    </tt-radio-group>
  `,
  props: args,
});
withHorizontal.args = {
  horizontal: true,
  required: false,
  disabled: false,
} as Partial<RadioButtonComponent>;
withHorizontal.storyName = 'With Horizontal';

export const withError = (args: RadioButtonComponent) => ({
  template: `
    <span>
      Choose Button <span *ngIf="required" class="text-red-500">*</span>
    </span>
    <tt-radio-group
      name="ngModel"
      [(ngModel)]="value"
      [required]="required"
      [disabled]="disabled"
      [isHorizontal]="horizontal"
    >
      <tt-radio-button value="btn1">Button 1</tt-radio-button>
      <tt-radio-button value="btn2">Button 2</tt-radio-button>
      <tt-radio-button value="btn3">Button 3</tt-radio-button>
      <tt-radio-button value="btn4">Button 4</tt-radio-button>
    </tt-radio-group>
    <span class="text-red-500">{{errorMsg}}</span>
  `,
  props: args,
});
withError.args = {
  horizontal: true,
  required: false,
  disabled: false,
  errorMsg: 'Error Message',
} as Partial<RadioButtonComponent>;
withError.storyName = 'With Error Message';
