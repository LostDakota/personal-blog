import { Component } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { elementAt } from 'rxjs/operators';
import { DescriptionService } from '../services/description.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})

export class AboutComponent {
  isVisible = false;
  imageUrl = ''

  constructor(
    private descriptionService: DescriptionService
  ) { };

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = !this.isVisible;
    }, 100);    

    if(this.checkBrowserSupport) {
      this.imageUrl = "/assets/drew.webp";
    } else {
      this.imageUrl = "/assets/drew.jpg";
    }

    this.descriptionService.updateDescription('My name is Drew Mika and I am a full stack developer who is passionate about Javascript and front end. I work fulltime in Sitecore and C# at Hyland Software in Westlake, Ohio.')
  }

  checkBrowserSupport(){
    const canvas = document.createElement('canvas');

    if (!!(canvas.getContext && canvas.getContext('2d'))) {
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } else {
      return false;
    }
  }
}
