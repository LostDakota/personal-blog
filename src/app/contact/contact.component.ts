import { Component} from '@angular/core';
import { DescriptionService } from '../description.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})

export class ContactComponent{
  isVisible = false;

  constructor(
    private descriptionService: DescriptionService
  ) { };

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = !this.isVisible;
    }, 100);

    this.descriptionService.updateDescription('I can be contacted at drew@mika.house.com or any of the other social media links at the bottom of this page.')
  }
}
