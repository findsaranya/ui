import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tt-autocomplete',
  template: `
    <p>
      autocomplete works!
    </p>
  `,
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
