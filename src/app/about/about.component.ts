import { Component} from '@angular/core';
import { DescriptionService } from '../description.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent {
  isVisible = false;
  
  constructor(
    private descriptionService: DescriptionService
  ) { };

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = !this.isVisible;
    }, 100);
    
    this.descriptionService.updateDescription('I am a full stack developer who is passionate about Javascript and front end. I work fulltime in Sitecore and C# at Hyland Software in Westlake, Ohio.')
  }
}
