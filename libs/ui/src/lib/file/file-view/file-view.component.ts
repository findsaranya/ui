import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  ChangeDetectorRef,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { IFileData } from '../file.model';

@Component({
  selector: 'tt-ui-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileViewComponent {
  @Input() fileData: IFileData[] = [];

  @Input() action: 'multiple' | 'default' = 'default';

  @Output() DownloadAction: EventEmitter<FileList> =
    new EventEmitter<FileList>();

  @Output() DeleteAction: EventEmitter<FileList> = new EventEmitter<FileList>();

  constructor(private detectChanges: ChangeDetectorRef) {}

  @HostBinding('class') get classes(): string {
    return 'ttui-file-view';
  }

  onDownload(event: Event, file: File) {
    const blob = new Blob([file]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
    //To-do returning undefined
    this.DownloadAction.emit(
      <FileList>(event.target as HTMLInputElement).files
    );
  }

  onDelete(event: Event, item: IFileData) {
    this.fileData = this.fileData.filter((file) => file.fileId !== item.fileId);
    //To-do returning undefined
    this.DeleteAction.emit(<FileList>(event.target as HTMLInputElement).files);
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
