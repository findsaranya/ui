import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileViewComponent } from './file-view/file-view.component';
import { FileTypeComponent } from './file-type/file-type.component';

@NgModule({
  declarations: [FileUploadComponent, FileViewComponent, FileTypeComponent],
  imports: [CommonModule],
  exports: [FileUploadComponent, FileViewComponent, FileTypeComponent],
})
export class FileModule {}
