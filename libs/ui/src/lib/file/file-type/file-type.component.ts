import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnChanges,
} from '@angular/core';
import { IFileData } from '../file.model';

@Component({
  selector: 'tt-ui-file-type',
  templateUrl: './file-type.component.html',
  styleUrls: ['./file-type.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FileTypeComponent implements OnChanges {
  @Input() fileIcon: 'file' | 'image' | 'pdf' | 'xlsx' | null = 'file';

  @Input() disabled = false;

  @Input() from: 'upload' | 'view' = 'upload';

  @Input() fileData: IFileData | undefined = undefined;

  imgSrc: string | ArrayBuffer | null | undefined = undefined;

  isSvg: boolean | undefined = false;

  constructor(private detectChanges: ChangeDetectorRef) {}

  ngOnChanges(): void {
    const file = this.fileData?.file;
    this.isSvg = file?.type.includes('svg');
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
