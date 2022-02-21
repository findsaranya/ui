import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { FileViewComponent } from './file-view.component';

export default {
  title: 'FileViewComponent',
  component: FileViewComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<FileViewComponent>;

const Template: Story<FileViewComponent> = (args: FileViewComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}