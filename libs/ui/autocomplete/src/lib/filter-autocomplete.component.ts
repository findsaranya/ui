import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'tt-filter-autocomplete',
  templateUrl: './filter-autocomplete.component.html',
})
export class FilterAutocompleteComponent implements OnInit {
  @Input() list: string[] = [];
  @Input() disabled = false;
  ctrl = new FormControl();
  filteredOptions?: Observable<string[]>;
  ngOnInit(): void {
    this.filteredOptions = this.ctrl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value))
    );
  }
  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.list.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
