import { CommonModule } from '@angular/common';
import { moduleMetadata, Meta } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { CheckboxComponent } from './checkbox.component';

export default {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      declarations: [CheckboxComponent],
    }),
  ],
} as Meta<CheckboxComponent>;

export const checkboxWithLabel = (args: CheckboxComponent) => ({
  template: `<tt-checkbox [checked]="checked" [disabled]="disabled" (valueChange)="valueChange($event)">Checkbox</tt-checkbox>`,
  props: { ...args, valueChange: action('valueChange') },
});

checkboxWithLabel.args = {
  checked: false,
  disabled: false,
} as Partial<CheckboxComponent>;
checkboxWithLabel.storyName = 'With Label';

export const checkboxWithoutLabel = (args: CheckboxComponent) => ({
  template: `<tt-checkbox [checked]="checked" [disabled]="disabled" (valueChange)="valueChange($event)"></tt-checkbox>`,
  props: { ...args, valueChange: action('valueChange') },
});

checkboxWithoutLabel.args = {
  checked: false,
  disabled: false,
} as Partial<CheckboxComponent>;
checkboxWithoutLabel.storyName = 'Without Label';

export const labelWithChecked = (args: CheckboxComponent) => ({
  template: `<tt-checkbox [checked]="checked" [disabled]="disabled" (valueChange)="valueChange($event)">Checkbox</tt-checkbox>`,
  props: { ...args, valueChange: action('valueChange') },
});

labelWithChecked.args = {
  checked: true,
  disabled: false,
} as Partial<CheckboxComponent>;
labelWithChecked.storyName = 'Label with Checked';

export const checkedWithDisabled = (args: CheckboxComponent) => ({
  template: `<tt-checkbox [checked]="checked" [disabled]="disabled" (valueChange)="valueChange($event)">Checkbox</tt-checkbox>`,
  props: { ...args, valueChange: action('valueChange') },
});

checkedWithDisabled.args = {
  checked: true,
  disabled: true,
} as Partial<CheckboxComponent>;
checkedWithDisabled.storyName = 'Checked with Disabled';

export const unCheckedWithDisabled = (args: CheckboxComponent) => ({
  template: `<tt-checkbox [checked]="checked" [disabled]="disabled" (valueChange)="valueChange($event)">Checkbox</tt-checkbox>`,
  props: { ...args, valueChange: action('valueChange') },
});

unCheckedWithDisabled.args = {
  checked: false,
  disabled: true,
} as Partial<CheckboxComponent>;
unCheckedWithDisabled.storyName = 'Unchecked with Disabled';
