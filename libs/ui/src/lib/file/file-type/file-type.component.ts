import { FileIconType, GetDataType, IFileData } from '../file.model';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'tt-ui-file-type',
  templateUrl: './file-type.component.html',
  styleUrls: ['./file-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTypeComponent implements OnChanges {
  @Input() fileIcon: FileIconType = 'file';

  @Input() disabled = false;

  @Input() getData: GetDataType = 'view';

  @Input() fileData!: IFileData;

  imgSrc?: string | ArrayBuffer | null;

  get fromDataType(): string {
    return this.getData === 'view' ? 'ttui-view-icon' : 'ttui-upload-icon';
  }

  constructor(private detectChanges: ChangeDetectorRef) {}

  ngOnChanges(): void {
    const file = this.fileData?.file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imgSrc = event.target?.result;
        this.detectChanges.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }
}
