import { CommonModule } from '@angular/common';
import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { Observable } from 'rxjs';
import { FileTypeComponent } from '../file-type/file-type.component';
import { FileViewComponent } from '../file-view/file-view.component';
import { FileUploadComponent } from './file-upload.component';

const uploadData = (upload: File) => {
  return new Observable((observer) => {
    observer.next(upload);
    observer.complete();
  });
};

const uploadOrDownloadComplete = () => ({});

const downloadData = (fileName: unknown) => {
  return new Observable((observer) => {
    observer.next(fileName);
    observer.complete();
  });
};

const fileDeleteCallback = {
  uploadCallback: uploadData.bind(this),
  uploadCompleteCallback: uploadOrDownloadComplete.bind(this),
  deleteCallback: downloadData.bind(this),
  deleteCompleteCallback: uploadOrDownloadComplete.bind(this),
};

export default {
  title: 'Components/File Upload',
  component: FileUploadComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      declarations: [FileUploadComponent, FileViewComponent, FileTypeComponent],
    }),
  ],
  argTypes: {
    fileIcon: {
      name: 'fileIcon',
      type: { name: 'string' },
      defaultValue: null,
      description: 'Renders drag and drop with selected file icon',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: null },
      },
      control: {
        type: 'select',
        options: ['file', 'image', 'pdf', 'xlsx', null],
      },
    },
    acceptableFileTypes: {
      control: {
        type: 'multi-select',
        options: ['.xls', '.xlsx', '.csv', '.pdf', '.png', '.jpg', '.jpeg'],
      },
    },
    fileAction: {
      name: 'action',
      type: { name: 'string' },
      defaultValue: null,
      description: 'Select type of action to be performed',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
      control: {
        type: 'select',
        options: ['default', 'multiple'],
      },
    },
  },
} as Meta<FileUploadComponent>;

const Template: Story<FileUploadComponent> = (args: FileUploadComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  acceptableFileTypes: [
    '.xls',
    '.xlsx',
    '.csv',
    '.pdf',
    '.png',
    '.jpg',
    '.jpeg',
  ],
  fileAction: 'default',
  buttonText: 'File Upload',
  fileActionCallback: fileDeleteCallback,
  disabled: false,
  helpText: 'Accepts all files. Maximum file size is 5MB.',
  isMultiple: false,
  maxFileSize: 5,
  title: 'Attachments',
};
Primary.storyName = 'File upload';

export const Secondary = Template.bind({});
Secondary.args = {
  acceptableFileTypes: [
    '.xls',
    '.xlsx',
    '.csv',
    '.pdf',
    '.png',
    '.jpg',
    '.jpeg',
  ],
  fileAction: 'default',
  fileActionCallback: fileDeleteCallback,
  dragAndDropText: ' Drag & Drop or Click here ',
  disabled: false,
  fileIcon: 'image',
  helpText: 'Accepts all files. Maximum file size is 5MB',
  isMultiple: false,
  maxFileSize: 5,
  title: 'Attachments',
  uploadType: 'dragAndDrop',
};
Secondary.storyName = 'Drag & Drop';
