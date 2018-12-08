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
  filter: String;
  isVisible = false;

  constructor(
    private data: DataService,
    private route: ActivatedRoute
  ) { };

  ngOnInit() {
    console.log(this.isVisible);

    this.filter = this.route.snapshot.paramMap.get('tag');
    
    if(this.filter){
      this.data.tagSearch(this.filter)
        .subscribe(          
          data => {
            this.posts$ = data;
            this.isVisible = !this.isVisible;
          }
        )
    } else {
      this.data.getPosts()
        .subscribe(
          data => {
            this.posts$ = data;
            this.isVisible = !this.isVisible;
            console.log(this.isVisible);
          }
        )
    }
  }
}
