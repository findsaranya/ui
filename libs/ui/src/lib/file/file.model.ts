import { Observable } from 'rxjs';

export enum EFileStatus {
  pending = 'pending',
  error = 'error',
  success = 'success',
}

export enum EFileIcon {
  file = 'file',
  image = 'image',
  pdf = 'pdf',
  xlsx = 'xlsx',
}

export type FileAcceptTypes =
  | '.xls'
  | '.xlsx'
  | '.csv'
  | '.pdf'
  | '.png'
  | '.jpg'
  | '.jpeg';

export interface IFileData {
  fileId: number;
  file: File;
  fileStatus: EFileStatus;
  errorMessage?: string;
}

export interface IData {
  uploadCallback: (file: File) => Observable<unknown>;
  uploadCompleteCallback: (response: unknown) => void;
}

export interface IUploadFileStatus {
  fileId: number;
  fileStatus: 'pending' | 'error' | 'success';
  errorMsg?: string;
}
