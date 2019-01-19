import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../title.service';
import { DescriptionService } from '../description.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
  
  posts$: Post[] = [];  
  filter: String;
  isVisible = false;

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private descriptionService: DescriptionService
  ) { };

  ngOnInit() {

    this.filter = this.route.snapshot.paramMap.get('tag');
    this.descriptionService.updateDescription('Here you will find blog posts on Angular, Javascript, Node.js and a bunch of other random things I like.')
    
    if(this.filter){
      this.data.tagSearch(this.filter)
        .subscribe(          
          data => {
            this.posts$ = data;
            this.isVisible = !this.isVisible;
            this.titleService.setTitle(`Posts tagged with ${this.filter} - Mika House Web Development`);
          }
        )
    } else {
      this.data.getPosts()
        .subscribe(
          data => {
            this.posts$ = data;
            this.isVisible = !this.isVisible;
          }
        )
    }
  }
}
