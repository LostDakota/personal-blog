import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  host: {'class': 'container'},
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {

  posts$: Post[];
  isVisible = false;

  constructor(
    private data: DataService,
    private cd: ChangeDetectorRef
  ) { };  

  ngOnInit() {
    this.data.getLatestPosts()
      .subscribe(
        data => {          
          this.isVisible = true;
          this.posts$ = data;
          this.cd.detectChanges();
        }
      )
  }
}
