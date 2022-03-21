import { CommonModule } from '@angular/common';
import { moduleMetadata, Meta } from '@storybook/angular';
import { FormFieldComponent } from '@tt-webapp/ui/form-field';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from './textarea.module';
import { TextFieldModule } from '@angular/cdk/text-field';

export default {
  title: 'Components/Textarea',
  component: FormFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, TextareaModule, TextFieldModule],
      declarations: [],
    }),
  ],
  argTypes: {
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
    isBlockElement: {
      name: 'isBlockElement',
      type: { name: 'boolean' },
      defaultValue: true,
      description: 'Enable full width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta<FormFieldComponent>;

export const TextareaPacked = (args: FormFieldComponent) => ({
  template: `
  <tt-form-field [disabled]="disabled" [isBlockElement]="isBlockElement">
    <tt-label> label </tt-label>
    <textarea
      [placeholder]="placeholder"
      textarea="packed"
      ttInput
      #input
    ></textarea>
    <tt-hint>Hint message</tt-hint>
  </tt-form-field>`,
  props: args,
});
TextareaPacked.args = {
  placeholder: 'type here...',
  isBlockElement: true,
  disabled: false,
} as Partial<FormFieldComponent>;

export const TextareaAuto = (args: FormFieldComponent) => ({
  template: `
  <tt-form-field [disabled]="disabled" [isBlockElement]="isBlockElement">
  <tt-label required>label</tt-label>
  <textarea
      ttInput
      #input
      textarea="auto"
      cdkTextareaAutosize
      #autosize="cdkTextareaAutosize"
      cdkAutosizeMinRows="5"
      cdkAutosizeMaxRows="11"
      [placeholder]="placeholder"
    ></textarea>
    <tt-hint>Hint message</tt-hint>
</tt-form-field>`,
  props: args,
});
TextareaAuto.args = {
  placeholder: 'type here...',
  isBlockElement: true,
  disabled: false,
} as Partial<FormFieldComponent>;

export const TextareaResizeable = (args: FormFieldComponent) => ({
  template: `
  <tt-form-field [disabled]="disabled" [isBlockElement]="isBlockElement">
    <tt-label>label</tt-label>
    <textarea
      [placeholder]="placeholder"
      textarea="resizeable"
      ttInput
      #input
    ></textarea>
  </tt-form-field> `,
  props: args,
});
TextareaResizeable.args = {
  placeholder: 'type here...',
  isBlockElement: true,
  disabled: false,
} as Partial<FormFieldComponent>;

export const TextAreaWithCharCounter = (args: FormFieldComponent) => ({
  template: `
  <tt-form-field [disabled]="disabled" [isBlockElement]="isBlockElement">
  <tt-label required>label</tt-label>
  <textarea
      ttInput
      #input
      textarea="auto"
      cdkTextareaAutosize
      #autosize="cdkTextareaAutosize"
      cdkAutosizeMinRows="5"
      cdkAutosizeMaxRows="11"
      [placeholder]="placeholder"
      maxLength="120"
    ></textarea>
    <tt-hint>Hint message</tt-hint>
</tt-form-field> `,
  props: args,
});
TextAreaWithCharCounter.args = {
  placeholder: 'type here...',
  isBlockElement: true,
  disabled: false,
} as Partial<FormFieldComponent>;
export const TextAreaWithValidation = (args: FormFieldComponent) => ({
  template: `
    <tt-form-field [disabled]="disabled" [isBlockElement]="isBlockElement">
    <tt-label>label</tt-label>
    <textarea
    [placeholder]="placeholder"
      required
      ttInput
      #input
      #validate="ngModel"
      ngModel
      textarea="resizeable"
    ></textarea>
    <tt-error *ngIf="validate.touched && validate.invalid">
      Label is required
    </tt-error>
  </tt-form-field> `,
  props: args,
});
TextAreaWithValidation.args = {
  placeholder: 'type here...',
  isBlockElement: true,
  disabled: false,
} as Partial<FormFieldComponent>;
