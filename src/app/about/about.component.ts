import { Component} from '@angular/core';
import { DescriptionService } from '../description.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent {
  constructor(
    private descriptionService: DescriptionService
  ) { };

  ngOnInit() {
    this.descriptionService.updateDescription('I am a full stack developer who is passionate about Javascript and front end. I work fulltime in Sitecore and C# at Hyland Software in Westlake, Ohio.')
  }
}
