import { CommonModule } from '@angular/common';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FormFieldModule } from '@tt-webapp/ui/form-field';
import { InputModule } from '@tt-webapp/ui/input';
import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteModule } from './autocomplete.module';
import { FilterAutocompleteComponent } from './filter-autocomplete.component';

export default {
  title: 'Components/Autocomplete',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, InputModule, FormFieldModule, AutocompleteModule],
    }),
  ],
} as Meta<AutocompleteComponent>;

export const SimpleAutocomplete: Story = (args) => ({
  props: args,
  template: `
  <tt-form-field>
  <tt-label>label</tt-label>
  <input
    type="type"
    placeholder="placeholder"
    ttInput
    #input
    [ttAutocomplete]="ref"
    [ttAutocompleteDisabled]="autocompleteDisabled"
  />
  <tt-autocomplete #ref="ttAutocomplete">
    <tt-option
      [value]="brand"
      *ngFor="let brand of list"
      >{{ brand }}</tt-option
    >
  </tt-autocomplete>
</tt-form-field>
  `,
});
SimpleAutocomplete.args = {
  list: ['brand-1', 'brand-2'],
  autocompleteDisabled: false,
};

const Template: Story<FilterAutocompleteComponent> = (
  args: FilterAutocompleteComponent
) => ({
  component: FilterAutocompleteComponent,
  props: args,
});

export const FilterAutocomplete = Template.bind({});
FilterAutocomplete.args = {
  list: ['option-1', 'option-2', 'option-3'],
  disabled: false,
};
