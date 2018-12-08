import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { TitleService } from '../title.service';
import { CardAnimation } from '../cardanimation';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit {

  post$: Post;
  isAuthenticated: boolean;  
  isVisible = false;

  constructor(
    private data: DataService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private authenticationService: AuthenticationService,
    private titleService: TitleService
  ) { };

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    this.data.getPost(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        data => {
          this.isVisible = !this.isVisible;
          this.post$ = data;
          this.titleService.setTitle(data.title + ' - Mika House Web Development');
        }
      );
  }

  deletePost(postId) {
    this.data.deletePost(postId)
      .subscribe(
        data => this.router.navigate(['/'])
      );
  }

  edit(postId){
    this.router.navigate(['/post/edit/' + postId]);
  }
}
