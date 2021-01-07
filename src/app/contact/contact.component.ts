import { ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { DescriptionService } from '../services/dom.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  host: {'class': 'container'},
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContactComponent{
  isVisible = false;

  constructor(
    private descriptionService: DescriptionService,
    private cd: ChangeDetectorRef
  ) { };

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = !this.isVisible;
      this.cd.detectChanges();
    }, 100);

    this.descriptionService.updateDescription('I can be contacted at drew@mika.house.com or any of the other social media links at the bottom of this page.')
  }
}
