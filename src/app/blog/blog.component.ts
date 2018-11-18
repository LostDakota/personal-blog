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

  constructor(
    private data: DataService
  ) { };

  ngOnInit() {
    this.data.getPosts()
      .subscribe(
        data => this.posts$ = data,
        error => this.posts$ = []
      );
  }
}
