import { Observable } from 'rxjs';

export enum FileUploadStatus {
  pending = 'pending',
  error = 'error',
  success = 'success',
}

export enum FileIcon {
  file = 'file',
  image = 'image',
  pdf = 'pdf',
  xlsx = 'xlsx',
}

export type AcceptableFileTypes =
  | '.xls'
  | '.xlsx'
  | '.csv'
  | '.pdf'
  | '.png'
  | '.jpg'
  | '.jpeg';

export type FileUploadType = 'selection' | 'dragAndDrop';

export type FileIconType = 'file' | 'image' | 'pdf' | 'xlsx';

export type GetDataType = 'upload' | 'view';

export type FileAction = 'multiple' | 'default';

export interface IFileData {
  fileId: number;
  file: File;
  fileStatus: FileUploadStatus;
  errorMessage?: string;
}

export interface IFileCallbackData {
  uploadCallback: (file: File) => Observable<unknown>;
  uploadCompleteCallback: (response: unknown) => void;
  deleteCallback: (payload: unknown) => Observable<unknown>;
  deleteCompleteCallback: (response: unknown) => void;
}

export interface IFileActionCallbackData {
  deleteCallback: (param: unknown) => Observable<unknown>;
  deleteCompleteCallback: (response: unknown) => void;
}
