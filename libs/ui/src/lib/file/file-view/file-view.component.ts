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
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FileViewComponent {
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

  getContainerClass(fileData: IFileData): string {
    return [
      fileData.fileStatus === 'error' ? 'border-red-500' : 'border-gray-300 ',
      this.getFileType(fileData.file) === 'image' ? 'min-h-70' : 'min-h-50',
    ].join(' ');
  }

  getActionClass(fileData: IFileData): string {
    return [
      fileData.fileStatus === 'success' ? 'ttui-stack-icon' : null,
      this.fileAction === 'multiple' && fileData.fileStatus === 'success'
        ? 'mr-5'
        : null,
    ].join(' ');
  }

  onDownload(file: File): void {
    const blob = new Blob([file]);
    const url = URL.createObjectURL(blob);
    const a = this.renderer.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
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
    const fileIcon = ['image', 'pdf', 'xlsx'].find((fileIconType) =>
      file?.type.includes(fileIconType)
    ) as FileIconType;
    return fileIcon ? fileIcon : 'file';
  }
}
