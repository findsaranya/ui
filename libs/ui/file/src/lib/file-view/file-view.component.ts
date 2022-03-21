import { FileIcon } from './../file.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  ChangeDetectorRef,
  Renderer2,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FileUploadStatus,
  FileAction,
  FileIconType,
  IFileDeleteCallback,
  IFileData,
} from '../file.model';

@Component({
  selector: 'tt-ui-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileViewComponent {
  private fileIconList = [FileIcon.image, FileIcon.pdf, FileIcon.xlsx];

  @Input() fileData: IFileData[] = [];

  @Input() fileAction: FileAction = 'default';

  @Input() fileDeleteCallback: IFileDeleteCallback = {
    deleteCallback: () => new Observable<unknown>(),
    deleteCompleteCallback: () => ({}),
  };

  @Output()
  fileDataChange: EventEmitter<IFileData[]> = new EventEmitter();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private renderer: Renderer2
  ) {}

  @HostBinding('class') get class(): string {
    return 'ttui-file-view';
  }

  getContainerClass(fileData: IFileData): { [key in string]: boolean } {
    return {
      'border-gray-300': fileData.fileStatus !== 'error',
      'border-red-500': fileData.fileStatus === 'error',
      'min-h-70': this.getFileType(fileData.file) === 'image',
    };
  }

  getActionClass(fileData: IFileData): { [key in string]: boolean } {
    return {
      'ttui-stack-icon': fileData.fileStatus === 'success',
      'mr-5':
        this.fileAction === 'multiple' && fileData.fileStatus === 'success',
    };
  }

  onDownload(file: File): void {
    const blob = new Blob([file]);
    const url = URL.createObjectURL(blob);
    const anchorElement = this.renderer.createElement('a') as HTMLAnchorElement;
    anchorElement.href = url;
    anchorElement.download = file.name;
    anchorElement.click();
    URL.revokeObjectURL(url);
  }

  onDelete(item: IFileData): void {
    const fileItem = item.file;
    const fileStatus = item.fileStatus;
    if (fileStatus === FileUploadStatus.success) {
      this.fileDeleteCallback.deleteCallback(fileItem.name).subscribe({
        next: (response: unknown) => {
          this.fileData = this.fileData.filter(
            (file) =>
              !(
                file.file.name === item.file.name && file.fileId === item.fileId
              )
          );
          this.changeDetector.markForCheck();
          this.fileDataChange.emit(this.fileData);

          this.fileDeleteCallback.deleteCompleteCallback(response);
        },
        error: (error: HttpErrorResponse) => {
          this.fileDeleteCallback.deleteCompleteCallback(error);
        },
      });
    } else if (fileStatus === FileUploadStatus.error) {
      this.fileData = this.fileData.filter(
        (file) =>
          !(file.file.name === item.file.name && file.fileId === item.fileId)
      );
      this.changeDetector.markForCheck();
    }
  }

  getFileType(file: File): FileIconType {
    const fileIcon: FileIconType | undefined = this.fileIconList.find(
      (fileIconType: FileIconType) => file?.type.includes(fileIconType)
    );
    return fileIcon || 'file';
  }
}
