import { CommonModule } from '@angular/common';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
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
  args:{
    size:'md',
    disabled:false
  }

} as Meta<ButtonComponent>;

// const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
//   component: ButtonComponent,
//   props: args,
// });


export const Primary = (args:ButtonComponent) => ({
  template:`
  <button
  tt-primary-btn
  >
  Button Primary
  </button>`,
  props:args

});
// Primary.args = {
//   size : "md",
//   disabled : false
// }

export const Secondary = (args:ButtonComponent) => ({
  template:`
  <button
  tt-secondary-btn
  size="md"
  [disabled]=false
  >
  Button Primary
  </button>`,
  props:args

});
Secondary.args = {
  size : "md",
  disabled : false
}
export const Warning = (args:ButtonComponent) => ({
  template:`
  <button
  tt-warning-btn
  size="sm"
  [disabled]=false
  >
  Button Label
  </button>`,

})
export const Ghost = (args:ButtonComponent) => ({
  template:`
  <button
  tt-ghost-btn
  size="sm"
  [disabled]=false
  >
  Button
  </button>`,

})

export const Transparent = (args:ButtonComponent) => ({
  template:`
  <button
  tt-transparent-btn
  size="sm"
  [disabled]=false
  >
  Button
  </button>`,

})
Transparent.args = {
  size:'md',
  disabled:false
}



