import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  ChangeDetectorRef,
  Renderer2,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  EFileStatus,
  FileAction,
  IFileActionCallbackData,
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

  @Input() fileActionCallbackData: IFileActionCallbackData = {
    deleteCallback: () => new Observable<unknown>(),
    deleteCompleteCallback: () => ({}),
  };

  constructor(
    private changeDetector: ChangeDetectorRef,
    private renderer: Renderer2
  ) {}

  @HostBinding('class') get classes(): string {
    return 'ttui-file-view';
  }

  onDownload(file: File) {
    const blob = new Blob([file]);
    const url = URL.createObjectURL(blob);
    const a = this.renderer.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  }

  onDelete(item: IFileData) {
    const fileItem = item.file;
    const fileStatus = item.fileStatus;
    if (fileStatus === EFileStatus.success) {
      this.fileActionCallbackData.deleteCallback(fileItem.name).subscribe({
        next: (response: unknown) => {
          console.log(response);
          this.fileData = this.fileData.filter(
            (file) => file.fileId !== item.fileId
          );
          this.changeDetector.markForCheck();
          this.fileActionCallbackData.deleteCompleteCallback(response);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
    } else if (fileStatus === EFileStatus.error) {
      this.fileData = this.fileData.filter(
        (file) => file.fileId !== item.fileId
      );
      this.changeDetector.markForCheck();
    }
  }

  getFileType(file: File) {
    if (file?.type.includes('image')) {
      return 'image';
    } else if (file?.type.includes('pdf')) {
      return 'pdf';
    } else if (file?.type.includes('spreadsheet')) {
      return 'xlsx';
    } else {
      return 'file';
    }
  }
}
