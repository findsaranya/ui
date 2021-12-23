import { CommonModule } from '@angular/common';
import { moduleMetadata, Meta } from '@storybook/angular';
import { ButtonComponent } from './button.component';

export default {
  title: 'ButtonComponent',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      declarations:[ButtonComponent]
    })
  ],
  argTypes:{
    size: {
      name: 'size',
      type: { name: 'string'},
      defaultValue: 'md',
      description: 'Button Sizes',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
      control: {
        type: 'select',
        options:['sm','md','lg'],
        

      }
    },
    disabled: {
      name: 'disabled',
      type: { name: 'string'},
      defaultValue: false,
      description: 'Enable button disable property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      control: {
        type: 'boolean'

      }
    },
    
  
  },
} as Meta<ButtonComponent>;

export const Primary = (args:ButtonComponent) => ({
  template:`
  <button
  tt-primary-btn
  [size]="size"
  [disabled]="disabled"
  >
  Button Primary
  </button>`,
  props:args

});
Primary.args = {
  size : "md",
  disabled : false
} as Partial <ButtonComponent>

export const Secondary = (args:ButtonComponent) => ({
  template:`
  <button
  tt-secondary-btn
  [size]="size"
  [disabled]="disabled"
  >
  Button Primary
  </button>`,
  props:args

});
Secondary.args = {
  size : "md",
  disabled : false
} as Partial <ButtonComponent>

export const Warning = (args:ButtonComponent) => ({
  template:`
  <button
  tt-warning-btn
  [size]="size"
  >
  Button Label
  </button>`,
 props:args,
})
Warning.parameters = {
controls: { include:['size'] } 
};

Warning.args = {
  size : "md",
} as Partial <ButtonComponent>

export const Ghost = (args:ButtonComponent) => ({
  template:`
  <button
  tt-ghost-btn
  [size]="size"
  [disabled]="disabled"
  >
  Button
  </button>`,
 props : args
})
Ghost.args = {
  size : "md",
  disabled : false
} as Partial <ButtonComponent>

export const Transparent = (args:ButtonComponent) => ({
  template:`
  <button
  tt-transparent-btn
  [size]="size"
  >
  Button
  </button>`,
props:args
});

Transparent.parameters = {
  controls: { include:['size'] } 
  };

Transparent.args = {
  size:'md'
} as Partial <ButtonComponent>




