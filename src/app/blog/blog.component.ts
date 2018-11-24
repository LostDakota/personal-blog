import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../models/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
  
  posts$: Post[] = [];  
  tag: String;

  constructor(
    private data: DataService,
    private route: ActivatedRoute
  ) { };

  ngOnInit() {

    this.tag = this.route.snapshot.paramMap.get('tag');
    
    if(this.tag){
      this.data.tagSearch(this.tag)
        .subscribe(
          data => this.posts$ = data
        )
    } else {
      this.data.getPosts()
        .subscribe(
          data => this.posts$ = data
        )
    }
  }
}
