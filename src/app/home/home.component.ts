import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  post$: Post;

  constructor(
    private data: DataService
  ) { };  

  ngOnInit() {
    this.data.getLastPost()
      .subscribe(
        data => {
          this.post$ = data;
        }
      )
  }
}
