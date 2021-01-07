import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Post } from '../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../services/title.service';
import { DescriptionService } from '../services/dom.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  host: {'class': 'container'}
})

export class BlogComponent implements OnInit {
  
  posts$: Post[] = [];  
  filter: String;
  isVisible = false;

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private descriptionService: DescriptionService,
    private cd: ChangeDetectorRef
  ) { };

  ngOnInit() {
    if (this.route.firstChild) {
      this.route.firstChild.paramMap.subscribe(params => {
        this.filter = params.get('tag');
      });
    }    
    
    if(this.filter){
      this.data.tagSearch(this.filter)
        .subscribe(          
          data => {
            this.posts$ = data;
            this.isVisible = !this.isVisible;
            this.titleService.setTitle(`Posts tagged with ${this.filter} - Mika House Web Development`);
            this.descriptionService.updateDescription(`These are all of the posts tagged with ${this.filter}.`)
            this.cd.detectChanges();
          }
        )
    } else {
      this.data.getPosts()
        .subscribe(
          data => {
            this.posts$ = data;
            this.isVisible = !this.isVisible;
            this.descriptionService.updateDescription('Here you will find blog posts on Angular, Javascript, Node.js and a bunch of other random things I like.');
            this.cd.detectChanges();
          }
        )
    }
  }
}
