import { CommonModule } from '@angular/common';
import { moduleMetadata, Meta } from '@storybook/angular';
import { FormFieldComponent } from '../form-field/form-field.component';
import { FormFieldModule } from '../form-field/form-field.module';
import { FormsModule } from '@angular/forms';
import { InputModule } from './input.module';
export default {
  title: 'InputComponent',
  component: FormFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormFieldModule, FormsModule, InputModule],
      declarations: [],
    }),
  ],
  argTypes: {
    type: {
      name: 'inputTypes',
      type: { name: 'string' },
      defaultValue: 'text',
      description: 'Input types',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
      control: {
        type: 'select',
        options: ['text', 'date', 'password', 'email'],
      },
    },
    isBlockElement: {
      name: 'Full Width',
      type: { name: 'boolean' },
      defaultValue: false,
      description: 'Enable input full width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      name: 'disabled',
      type: { name: 'string' },
      defaultValue: false,
      description: 'Enable Input disable property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta<FormFieldComponent>;

export const Primary = (args: FormFieldComponent) => ({
  template: `
  <tt-form-field [disabled]="disabled" [isBlockElement]="isBlockElement">
    <tt-label> label </tt-label>
    <input [type]="type"  [placeholder]="placeholder" ttInput #input placeHolder="hello there" /> 
  </tt-form-field>`,
  props: args,
});

Primary.args = {
  type: 'password',
  isBlockElement: true,
  placeholder: 'type here...',
  disabled: false,
} as Partial<FormFieldComponent>;

export const InputRequired = (args: FormFieldComponent) => ({
  template: `
  <tt-form-field [disabled]="disabled" [isBlockElement]="isBlockElement">
  <tt-label required>label</tt-label>
  <input
    #validate="ngModel"
    [type]="type"
    [placeholder]="placeholder"
    ttInput
    ngModel
    required
    #input
  />
  <tt-error *ngIf="validate.touched && validate.invalid">
    Label is required</tt-error
  >
</tt-form-field>`,
  props: args,
});

InputRequired.args = {
  type: 'password',
  isBlockElement: true,
  placeholder: 'type here...',
} as Partial<FormFieldComponent>;

export const InputWithHint = (args: FormFieldComponent) => ({
  template: `
  <tt-form-field  [isBlockElement]="isBlockElement" [disabled]="disabled">
    <tt-label> label </tt-label>
    <input [type]="type" [placeholder]="placeholder" ttInput #input placeHolder="hello there" />
    <tt-hint>Hint message</tt-hint>
  </tt-form-field> `,
  props: args,
});

InputWithHint.args = {
  type: 'password',
  isBlockElement: true,
  placeholder: 'type here...',
} as Partial<FormFieldComponent>;
