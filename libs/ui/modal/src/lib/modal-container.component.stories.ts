import { CommonModule } from '@angular/common';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ModalModule } from './modal.module';
import {
  ModalMainComponent,
  PromptComponent,
} from './modalstories-component/modal-component.component';

export default {
  title: 'Components/Modal',
  component: ModalMainComponent,
  decorators: [
    moduleMetadata({
      imports: [ModalModule, CommonModule],
    }),
  ],
  argTypes: {
    modalClose: {
      action: 'Modal Closed',
      description: 'Event emitted when the modal get closed',
      table: {
        type: { summary: 'Event Emitter' },
        defaultValue: { summary: 'EventEmitter' },
      },
      control: {
        type: null,
      },
    },
    modalData: {
      name: 'ModalConfig',
      description:
        'Provide modal config details like width,height,disableclose',
      table: {
        type: {
          summary: 'object',
          detail: `width in px,vw,rem\nheight in px,vh,rem\ndisableClose boolean\nmax-width in px,%,vw,rem\n
             width,height,max-width - give the values as string
            `,
        },
        defaultValue: { summary: 'object' },
      },
    },
  },
  args: {
    modalData: {
      width: '',
      maxWidth: '80vh',
      disableClose: false,
      height: '',
    },
  },
} as Meta<ModalMainComponent>;

const Template: Story<ModalMainComponent> = (args: ModalMainComponent) => ({
  props: args,
  template: `<tt-modal-maincomponent [modalData]="modalData" (modalClose)="modalClose($event)"></tt-modal-maincomponent>`,
});

export const ContentModal = Template.bind({});
ContentModal.args = {
  modalData: {
    width: '',
    maxWidth: '80vh',
    disableClose: false,
    height: '',
  },
};

const PromptTemplate: Story<PromptComponent> = (args: PromptComponent) => ({
  props: args,
  template: `<tt-modal-prompt [modalData]="modalData" (modalClose)="modalClose($event)"></tt-modal-prompt>`,
});

export const PromptModal = PromptTemplate.bind({});
PromptModal.args = {
  modalData: {
    width: '',
    maxWidth: '80vh',
    disableClose: false,
    height: '',
  },
};
