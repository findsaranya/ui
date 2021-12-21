import { Component } from '@angular/core';

@Component({
  selector: 'tt-webapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title:"sm"|"lg"|"md" = 'sm';
  hide =false;
  toggle(){
    if(this.title == 'md'){
      this.title='sm'
    }else{
      this.title="md";
    }
    this.hide = !this.hide;
  }
  
}
