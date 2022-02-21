import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { FileAcceptTypes, IData, IFileData, EFileStatus } from '../file.model';

let uniqueId = 0;

@Component({
  selector: 'tt-ui-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  @Input() title = 'Attachments';

  @Input() uploadType: 'upload' | 'dragAndDrop' = 'upload';

  @Input() fileIcon: 'file' | 'image' | 'pdf' | 'xlsx' | null = null;

  @Input() dragAndDropText = 'Drag & Drop or Click here';

  @Input() acceptTypes: FileAcceptTypes[] = [];

  @Input() buttonText = 'Upload Files';

  @Input() isMultiple = false;

  @Input() id = `ttui-file-upload-${++uniqueId}`;

  @Input() action: 'multiple' | 'default' = 'default';

  @Input() name = '';

  @Input() disabled = false;

  @Input() required = false;

  @Input() data: IData = {
    uploadCallback: () => new Observable<unknown>(),
    uploadCompleteCallback: () => ({}),
    deleteCallback: () => new Observable<unknown>(),
    deleteCompleteCallback: () => ({}),
  };

  // TODO: Need to update in Global config.
  @Input() maxFileSize = 5;

  fileData: IFileData[] = [];

  files: File[] = [];

  @ViewChild('input') inputElement?: ElementRef<HTMLInputElement>;

  @Input() helpText = 'Accepts all files. Maximum file size is 5MB.';

  constructor(private detectChanges: ChangeDetectorRef) {}

  handleChangeEvent(event: Event) {
    this.removeFiles();
    if (this.isMultiple) {
      const targetFiles = Array.from(
        <FileList>(event.target as HTMLInputElement).files
      );
      this.uploadMultipleFiles(targetFiles);
    } else {
      const targetFile = <File>(
        (event.target as HTMLInputElement).files?.item(0)
      );
      if (!targetFile) {
        return;
      }
      const errorMsg = this.validateFile(targetFile);
      const fileStatus = errorMsg ? EFileStatus.error : EFileStatus.pending;
      this.fileData.push({
        fileId: 0,
        file: targetFile,
        fileStatus: fileStatus,
        errorMessage: errorMsg,
      });
      this.detectChanges.markForCheck();
      if (fileStatus === EFileStatus.pending) {
        this.uploadSingleFile(this.fileData[0]);
      }
    }
  }

  handleDragEvent(event: DragEvent) {
    this.removeFiles();
    if (this.isMultiple) {
      const dataTransferFiles = Array.from(<FileList>event.dataTransfer?.files);
      this.uploadMultipleFiles(dataTransferFiles);
    } else {
      const dataTransferFile = <File>event.dataTransfer?.files.item(0);
      if (!dataTransferFile) {
        return;
      }
      const errorMsg = this.validateFile(dataTransferFile);
      const fileStatus = errorMsg ? EFileStatus.error : EFileStatus.pending;
      this.fileData.push({
        fileId: 0,
        file: dataTransferFile,
        fileStatus: fileStatus,
        errorMessage: errorMsg,
      });
      this.detectChanges.markForCheck();
      if (fileStatus === EFileStatus.pending) {
        this.uploadSingleFile(this.fileData[0]);
      }
    }
  }

  removeFiles() {
    if (this.files.length !== 0) {
      this.files = [];
    }
    if (this.fileData.length !== 0) {
      this.fileData = [];
    }
  }

  uploadSingleFile(singleFileData: IFileData) {
    if (!singleFileData) {
      return;
    }
    this.data.uploadCallback(singleFileData.file).subscribe({
      next: (response: unknown) => {
        this.updateFileStatus(singleFileData.fileId, EFileStatus.success);
        this.detectChanges.markForCheck();
        this.data.uploadCompleteCallback(response);
      },
      error: (error: HttpErrorResponse) => {
        this.updateFileStatus(
          singleFileData.fileId,
          EFileStatus.error,
          error.message
        );
        this.detectChanges.markForCheck();
      },
    });
  }

  private updateFileStatus(
    fileId: number,
    fileStatus: EFileStatus,
    errorMessage?: string
  ): void {
    this.fileData = this.fileData.map((eachFileData) => {
      if (eachFileData.fileId === fileId) {
        eachFileData.fileStatus = fileStatus;
        if (errorMessage) {
          eachFileData.errorMessage = errorMessage;
        }
      }
      return eachFileData;
    });
  }

  uploadMultipleFiles(files: File[]) {
    if (!files || files.length === 0) {
      return;
    }
    this.fileData = files.map((file: File, index: number) => {
      const errorMsg = this.validateFile(file);
      const fileStatus = errorMsg ? EFileStatus.error : EFileStatus.pending;
      return {
        fileId: index,
        file: file,
        fileStatus: fileStatus,
        errorMessage: errorMsg,
      };
    });
    this.fileData.forEach((singleFileData: IFileData) => {
      if (singleFileData.fileStatus === EFileStatus.pending) {
        this.uploadSingleFile(singleFileData);
      }
    });
  }

  validateFile(file: File) {
    if (!file) {
      return;
    }
    const fileName = file.name;
    const fileSize = file.size / 1024 / 1024;
    const fileExtension = <FileAcceptTypes>(
      fileName.slice(Math.max(0, fileName.lastIndexOf('.')) || Infinity)
    );
    if (!this.acceptTypes.includes(fileExtension)) {
      return 'Unsupported File.';
    } else if (fileSize > this.maxFileSize) {
      return 'File size exceeds.';
    } else {
      return undefined;
    }
  }
}
