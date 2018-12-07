import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  posts$: Post[];

  constructor(
    private data: DataService
  ) { };  

  ngOnInit() {
    this.data.getLatestPosts()
      .subscribe(
        data => {
          this.posts$ = data;
        }
      )
  }
}
