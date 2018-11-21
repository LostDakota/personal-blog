import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
  
  posts$: Post[] = [];
  isTagSearch: boolean = false;
  searchedTag: string = '';

  constructor(
    private data: DataService
  ) { };

  ngOnInit() {
    
    this.data.getPosts()
      .subscribe(
        data => this.posts$ = data
      );
  }

  tagSearch(tag: string) {
    this.data.tagSearch(tag)
      .subscribe(
        data => {
          this.posts$ = data;
          this.isTagSearch = true;
          this.searchedTag = tag;
        }
      );
  }

  removeTagFilter() {
    this.isTagSearch = false;
    this.searchedTag = '';
    this.data.getPosts()
      .subscribe(
        data => this.posts$ = data
      )
  }
}
