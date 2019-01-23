import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { TitleService } from '../title.service';
import { DescriptionService } from '../description.service';

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
    private titleService: TitleService,
    private descriptionService: DescriptionService
  ) { };

  ngOnInit() {
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    this.data.getPost(this.route.snapshot.paramMap.get('id'))
      .subscribe(
        data => {
          this.isVisible = !this.isVisible;
          this.post$ = data;
          this.titleService.setTitle(data.title + ' - Mika House Web Development');
          this.descriptionService.updateDescription(data.description);
        }
      );

    (function () { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');

      s.src = '//mika-house.disqus.com/embed.js';

      s.setAttribute('data-timestamp', new Date().toString());
      (d.head || d.body).appendChild(s);
    })();
  }

  deletePost(postId) {
    this.data.deletePost(postId)
      .subscribe(
        data => this.router.navigate(['/'])
      );
  }

  edit(postId) {
    this.router.navigate(['/post/edit/' + postId]);
  }
}
