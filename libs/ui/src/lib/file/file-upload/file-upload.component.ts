import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uid } from 'uuid';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  AcceptableFileTypes,
  IFileActionCallback,
  IFileDeleteCallback,
  IFileData,
  FileUploadStatus,
  FileUploadType,
  FileIconType,
  FileAction,
} from '../file.model';

@Component({
  selector: 'tt-ui-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent implements OnInit {
  @Input() title = 'Attachments';

  @Input() uploadType: FileUploadType = 'selection';

  @Input() fileIcon: FileIconType | null = null;

  @Input() dragAndDropText = 'Drag & Drop or Click here';

  @Input() acceptableFileTypes: AcceptableFileTypes[] = [];

  @Input() buttonText = 'Upload Files';

  @Input() isMultiple = false;

  @Input() id = `ttui-file-upload-${uid()}`;

  @Input() fileAction: FileAction = 'default';

  @Input() disabled = false;

  @Input() required = false;

  @Input() fileActionCallback: IFileActionCallback = {
    uploadCallback: () => new Observable<unknown>(),
    uploadCompleteCallback: () => ({}),
    deleteCallback: () => new Observable<unknown>(),
    deleteCompleteCallback: () => ({}),
  };

  @Input() maxFileSize = 5;

  //TODO: localize function required
  @Input()
  helpText = `Accepts all files. Maximum file size is ${this.maxFileSize}MB.`;

  fileData: IFileData[] = [];

  files: File[] = [];

  fileDeleteCallback!: IFileDeleteCallback;

  get dragAndDropType(): string {
    return this.fileIcon
      ? 'ttui-file-drag-drop-filetype'
      : 'ttui-file-drag-drop';
  }

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fileDeleteCallback = {
      deleteCallback: this.fileActionCallback.deleteCallback,
      deleteCompleteCallback: this.fileActionCallback.deleteCompleteCallback,
    };
  }

  private handleSingleFileChange(targetFile: File | null | undefined): void {
    if (!targetFile) {
      return;
    } else {
      this.removeFiles();
    }
    const errorMsg = this.validateFile(targetFile);
    const fileStatus = errorMsg
      ? FileUploadStatus.error
      : FileUploadStatus.pending;
    this.fileData.push({
      fileId: 0,
      file: targetFile,
      fileStatus: fileStatus,
      errorMessage: errorMsg,
    });
    this.changeDetector.markForCheck();
    if (!errorMsg) {
      this.uploadSingleFile(this.fileData[0]);
    }
  }

  handleChangeEvent(event: Event): void {
    const eventTarget = event.target as HTMLInputElement;
    if (this.isMultiple) {
      const targetFiles = Array.from(eventTarget.files || []);
      this.uploadMultipleFiles(targetFiles);
    } else {
      const targetFile = eventTarget.files?.item(0);
      this.handleSingleFileChange(targetFile);
    }
  }

  handleDragEvent(event: DragEvent): void {
    const eventTarget = event.dataTransfer;
    if (this.isMultiple) {
      const dataTransferFiles = Array.from(eventTarget?.files || []);
      this.uploadMultipleFiles(dataTransferFiles);
    } else {
      const dataTransferFile = eventTarget?.files.item(0);
      this.handleSingleFileChange(dataTransferFile);
    }
  }

  removeFiles(): void {
    if (this.files.length) {
      this.files = [];
    }
    if (this.fileData.length) {
      this.fileData = [];
    }
  }

  uploadSingleFile(singleFileData: IFileData): void {
    if (!singleFileData) {
      return;
    }
    this.fileActionCallback.uploadCallback(singleFileData.file).subscribe({
      next: (response: unknown) => {
        this.updateFileStatus(singleFileData.fileId, FileUploadStatus.success);
        this.changeDetector.markForCheck();
        this.fileActionCallback.uploadCompleteCallback(response);
      },
      error: (error: HttpErrorResponse) => {
        this.updateFileStatus(
          singleFileData.fileId,
          FileUploadStatus.error,
          error.message
        );
        this.changeDetector.markForCheck();
      },
    });
  }

  private updateFileStatus(
    fileId: number,
    fileStatus: FileUploadStatus,
    errorMessage?: string
  ): void {
    this.fileData = this.fileData.map((eachFileData) => {
      if (eachFileData.fileId === fileId) {
        eachFileData.fileStatus = fileStatus;
        eachFileData.errorMessage = errorMessage;
      }
      return eachFileData;
    });
  }

  uploadMultipleFiles(files: File[]): void {
    if (!files?.length) {
      return;
    }
    files.forEach((file: File) => {
      const errorMsg = this.validateFile(file);
      const fileStatus = errorMsg
        ? FileUploadStatus.error
        : FileUploadStatus.pending;
      this.fileData.push({
        fileId: this.fileData.length - 1,
        file: file,
        fileStatus: fileStatus,
        errorMessage: errorMsg,
      });
    });

    this.fileData.forEach((singleFileData: IFileData) => {
      if (singleFileData.fileStatus === FileUploadStatus.pending) {
        this.uploadSingleFile(singleFileData);
      }
    });
  }

  validateFile(file: File): string | undefined {
    if (!file) {
      return;
    }
    const fileName = file.name;
    const fileSize = file.size / 1024 / 1024;
    const fileExtension = <AcceptableFileTypes>(
      fileName.slice(Math.max(0, fileName.lastIndexOf('.')) || Infinity)
    );
    if (!this.acceptableFileTypes.includes(fileExtension)) {
      return 'Unsupported File.';
    } else if (fileSize > this.maxFileSize) {
      return 'File size exceeds.';
    } else {
      return;
    }
  }
}
