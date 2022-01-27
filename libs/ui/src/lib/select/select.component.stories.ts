import { CommonModule } from '@angular/common';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { OptionComponent } from '../option/option.component';
import { SelectComponent } from './select.component';
import { SelectModule } from './select.module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

export default {
  title: 'Components/Select',
  component: SelectComponent,
  subcomponents: OptionComponent,
  decorators: [
    moduleMetadata({
      imports: [SelectModule, CommonModule, ReactiveFormsModule, FormsModule],
    }),
  ],
} as Meta<SelectComponent>;

export const SingleSelect: Story = (args) => ({
  props: {
    ...args,
    optionChange: action('option changed'),
  },
  template: `
  <tt-select (selectionChange)="optionChange()"
   [disabled]="disabled"
   [value]="value"
   >
  <tt-option *ngFor="let option of options"
  [disabled]="option_disable" 
  [value]="option.value">{{option.label}}</tt-option>
 
</tt-select>
  `,
});
SingleSelect.args = {
  disabled: false,
  value: '',
  option_disable: false,
  options: [
    {
      label: 'Brand-1',
      value: '1',
    },
  ],
} as Partial<SelectComponent>;

export const MultiSelect: Story = (args) => ({
  props: {
    ...args,
    optionChange: action('option changed'),
  },
  template: `
  <tt-select multiple (selectionChange)="optionChange()"
   [disabled]="disabled"
   [value]="value"
   >
  <tt-option *ngFor="let option of options" [disabled]="option_disable"
  [value]="option.value">{{option.label}}</tt-option>
 
</tt-select>
  `,
});
MultiSelect.args = {
  disabled: false,
  value: [],
  option_disable: false,
  options: [
    {
      label: 'Brand -1',
      value: 1,
    },
    {
      label: 'Brand -2',
      value: 2,
    },
  ],
} as Partial<SelectComponent>;

export const TemplateFormSelect: Story = (args) => {
  return {
    props: {
      ...args,
    },
    component: SelectComponent,
    template: `
    <form #test="ngForm" >
    <tt-select
     [disabled]="disabled"
     name="test"
     multiple
    #test=ngModel
    required
    ngModel
     >
    <tt-option *ngFor="let option of options" 
    [value]="option.value">{{option.label}}</tt-option>
   
  </tt-select>
  </form>
    `,
  };
};

TemplateFormSelect.args = {
  disabled: false,
  options: [
    {
      label: 'Brand -1',
      value: 1,
    },
    {
      label: 'Brand -2',
      value: 2,
    },
  ],
} as Partial<SelectComponent>;

export const ReactiveFormSelect: Story = (args) => {
  const formGroup = new FormGroup({
    test: new FormControl([1], [Validators.required]),
  });
  return {
    props: {
      ...args,
      form: formGroup,
    },
    component: SelectComponent,
    template: `
    <form [formGroup]="form" >
    <tt-select
     [disabled]="disabled"
     formControlName="test"
     multiple
     >
    <tt-option *ngFor="let option of options" 
    [value]="option.value">{{option.label}}</tt-option>
   
  </tt-select>
  </form>
    `,
  };
};

ReactiveFormSelect.args = {
  disabled: true,
  options: [
    {
      label: 'Brand -1',
      value: 1,
    },
    {
      label: 'Brand -2',
      value: 2,
    },
  ],
} as Partial<SelectComponent>;
