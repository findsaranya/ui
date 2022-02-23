import { FileTypeComponent } from './../file-type/file-type.component';
import { FileViewComponent } from './../file-view/file-view.component';
import { CommonModule } from '@angular/common';
import { moduleMetadata, Meta } from '@storybook/angular';
import { Observable } from 'rxjs';

export default {
  title: 'Components/File View',
  component: FileViewComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      declarations: [FileViewComponent, FileTypeComponent],
    }),
  ],
  argTypes: {
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
} as Meta<FileViewComponent>;

const downloadComplete = () => ({});

const downloadData = (fileName: unknown) => {
  return new Observable((observer) => {
    observer.next(fileName);
    observer.complete();
  });
};

const fileDeleteCallback = {
  deleteCallback: downloadData.bind(this),
  deleteCompleteCallback: downloadComplete.bind(this),
};

const successFile = new File([''], 'sample file.pdf');

const successFileData = [
  {
    fileId: 0,
    file: successFile,
    fileStatus: 'success',
  },
];
const pendingFileData = [
  {
    fileId: 0,
    file: successFile,
    fileStatus: 'pending',
  },
];
const errorFile = new File([''], 'sample file.pdfx');

const errorFileData = [
  {
    fileId: 0,
    file: errorFile,
    fileStatus: 'error',
    errorMessage: 'Unsupported format.',
  },
];

const multipleFileData = [
  {
    fileId: 0,
    file: successFile,
    fileStatus: 'pending',
  },
  {
    fileId: 1,
    file: successFile,
    fileStatus: 'success',
  },
  {
    fileId: 2,
    file: errorFile,
    fileStatus: 'error',
    errorMessage: 'Error message',
  },
];

export const MultipleFiles = (args: FileViewComponent) => ({
  template: ` <tt-ui-file-view
    [fileData]="fileData"  [fileDeleteCallback]="fileDeleteCallback"
  ></tt-ui-file-view>`,
  props: { ...args },
});

MultipleFiles.args = {
  fileAction: 'default',
  fileData: multipleFileData,
  fileDeleteCallback: fileDeleteCallback,
} as Partial<FileViewComponent>;
MultipleFiles.storyName = 'Multiple files';

export const Primary = (args: FileViewComponent) => ({
  template: ` <tt-ui-file-view
    [fileData]="fileData"  [fileDeleteCallback]="fileDeleteCallback"
  ></tt-ui-file-view>`,
  props: { ...args },
});

Primary.args = {
  fileAction: 'default',
  fileData: successFileData,
  fileDeleteCallback: fileDeleteCallback,
} as Partial<FileViewComponent>;
Primary.storyName = 'Success';

export const Secondary = (args: FileViewComponent) => ({
  template: ` <tt-ui-file-view
    [fileData]="fileData"  [fileDeleteCallback]="fileDeleteCallback"
  ></tt-ui-file-view>`,
  props: { ...args },
});

Secondary.args = {
  fileAction: 'default',
  fileData: errorFileData,
  fileDeleteCallback: fileDeleteCallback,
} as Partial<FileViewComponent>;
Secondary.storyName = 'Error';

export const Pending = (args: FileViewComponent) => ({
  template: ` <tt-ui-file-view
    [fileData]="fileData"  [fileDeleteCallback]="fileDeleteCallback"
  ></tt-ui-file-view>`,
  props: { ...args },
});

Pending.args = {
  fileAction: 'default',
  fileData: pendingFileData,
  fileDeleteCallback: fileDeleteCallback,
} as Partial<FileViewComponent>;
Pending.storyName = 'Pending';
