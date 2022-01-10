import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tt-webapp-failed-to-load-application',
  templateUrl: './failed-to-load-application.component.html',
  styleUrls: ['./failed-to-load-application.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FailedToLoadApplicationComponent implements OnInit {
  message = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.message = this.route.snapshot.queryParams['message'] || '';
  }
}
