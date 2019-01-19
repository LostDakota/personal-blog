import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../title.service';

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
    private titleService: TitleService
  ) { };

  ngOnInit() {

    this.filter = this.route.snapshot.paramMap.get('tag');
    
    if(this.filter){
      this.data.tagSearch(this.filter)
        .subscribe(          
          data => {
            this.posts$ = data;
            this.isVisible = !this.isVisible;
            this.titleService.setTitle(`Posts tagged with ${this.filter} - Mika House Web Development`)
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
