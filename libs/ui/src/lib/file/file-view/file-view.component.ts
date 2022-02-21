import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tt-ui-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
