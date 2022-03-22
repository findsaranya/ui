import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { PromptModalDemoComponent } from './prompt-modal-demo.component';
import { PromptModalModule } from '../prompt-modal.module';
import { PromptModalDemoModule } from './prompt-modal-demo.module';

export default {
  title: 'components/Prompt Modal',
  component: PromptModalDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [PromptModalDemoModule, PromptModalModule],
    }),
  ],
  argTypes: {
    actionDone: {
      name: 'Modal Action',
      action: 'Action Done',
      description: 'Event emitted when the action is done',
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
          detail: `width : px | vw | rem\nheight : px | vh | rem\ndisableClose(The close on click function in the modal background is disabled) : boolean\nmax-width : px | % | vw | rem\ndata : {
                title: string,
                body: string,
                label?: string,
                primaryButton: string,
                secondaryButton: string,
                primaryButtonType: string,
                secondaryButtonType: string,
              }
            `,
        },
        defaultValue: { summary: 'object' },
      },
    },
  },
} as Meta<PromptModalDemoComponent>;

const Template: Story<PromptModalDemoComponent> = (
  args: PromptModalDemoComponent
) => ({
  props: args,
  template: `
  <tt-prompt-modal-demo [modalData]="modalData" buttonName='Archive Supplier' (actionDone)="actionDone($event)"></tt-prompt-modal-demo>`,
});

export const ArchiveSupplier = Template.bind({});
ArchiveSupplier.args = {
  modalData: {
    width: '550px',
    maxWidth: '80vh',
    disableClose: false,
    data: {
      title: 'Archive Supplier',
      body: 'Archiving the supplier will remove their details from your company account. You will no longer be able to send any new requests to the supplier.',
      label: 'Are you sure you want to archive this supplier?',
      primaryButton: 'Archive Supplier',
      secondaryButton: 'Cancel',
      primaryButtonType: 'warning',
      secondaryButtonType: 'ghost',
    },
  },
};

ArchiveSupplier.parameters = {
  docs: {
    source: {
      code: `
TYPESCRIPT:
  modalData: Modalconfig<IPromptModel> = 
    {
      width: '550px',
      //sample data
      data: {
        title: 'Archive Supplier',
        body: 'Archiving the supplier will remove their details from your company account. You will no longer be able to send any new requests to the supplier.',
        label: 'Are you sure you want to archive this supplier?',
        primaryButton: 'Archive Supplier',
        secondaryButton: 'Cancel',
        primaryButtonType: 'warning',
        secondaryButtonType: 'ghost',
      },
    };
      
  archiveSupplier(): void {
    const ref = this.modal.open(PromptModalComponent, this.modalData);
    ref.afterClosed.subscribe((ref: unknown) => {
      if(ref===this.modalData.data?.primaryButton){
        //primary button click function call
      }
      else if(ref===this.modalData.data?.secondaryButton){
        //secondary button click function call
      }
    });
  }

HTML:
  <button tt-btn-primary size="lg" (click)="archiveSupplier()">Archive Supplier</button>`,
    },
  },
};

const EditMaterialTemplate: Story<PromptModalDemoComponent> = (
  args: PromptModalDemoComponent
) => ({
  props: args,
  template: `
  <tt-prompt-modal-demo [modalData]="modalData" buttonName='Edit Material' (actionDone)="actionDone($event)"></tt-prompt-modal-demo>`,
});

export const EditMaterial = EditMaterialTemplate.bind({});
EditMaterial.args = {
  modalData: {
    width: '550px',
    maxWidth: '80vh',
    disableClose: false,
    data: {
      title: 'Edit Material',
      body: 'Editing this material will affect areas where it was previously used. Are you sure you want to edit?',
      primaryButton: 'Yes',
      secondaryButton: 'No',
      primaryButtonType: 'secondary',
      secondaryButtonType: 'ghost',
    },
  },
};

EditMaterial.parameters = {
  docs: {
    source: {
      code: `
TYPESCRIPT:
  modalData: Modalconfig<IPromptModel> = 
    {
      width: '550px',
      maxWidth: '80vh',
      disableClose: false,
      data: {
        title: 'Edit Material',
        body: 'Editing this material will affect areas where it was previously used. Are you sure you want to edit?',
        primaryButton: 'Yes',
        secondaryButton: 'No',
        primaryButtonType: 'primary',
        secondaryButtonType: 'ghost',
      }
    };
      
  editMaterial(): void {
    const ref = this.modal.open(PromptModalComponent, this.modalData);
    ref.afterClosed.subscribe((ref: unknown) => {
      if(ref===this.modalData.data?.primaryButton){
        //primary button click function call
      }
      else if(ref===this.modalData.data?.secondaryButton){
        //secondary button click function call
      }
    });
  }

HTML:
  <button tt-btn-primary size="lg" (click)="editMaterial()">Edit Material</button>`,
    },
  },
};
