import { Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})

export class FooterComponent {
year: Number;

  constructor() { };

  ngOnInit() {
    this.year = new Date().getFullYear();
  }
}