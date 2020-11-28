import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../services/data.service';
import { Post } from '../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { TitleService } from '../services/title.service';
import { DescriptionService } from '../services/description.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PostComponent implements OnInit {

  post$: Post;
  isAuthenticated: boolean;
  isVisible = false;
  urls = ["https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js", "/hl.js"]

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
    this.data.getPost(this.route.snapshot.paramMap.get('slug'))
      .subscribe(
        data => {
          this.isVisible = !this.isVisible;
          this.post$ = data;
          this.titleService.setTitle(`${data.title} - Mika House Web Development`);
          this.descriptionService.updateDescription(data.description);          
          this.loadDisqus();
        }
      );
  }

  ngAfterViewInit() {
    this.urls.forEach(url => {
      const d = document, scrpt = d.createElement('script');
      scrpt.src = url;
      d.body.appendChild(scrpt);
    });
  }

  loadDisqus() {
    setTimeout(() => {
      var d = document, s = d.createElement('script');

      s.src = '//mika-house.disqus.com/embed.js';

      s.setAttribute('data-timestamp', new Date().toString());
      if (document.querySelector('#disqus_thread')) {
        (d.head || d.body).appendChild(s);
      }
    }, 1000);
  }

  deletePost(postId: String) {
    this.data.deletePost(postId)
      .subscribe(
        data => this.router.navigate(['/'])
      );
  }

  edit(slug: string) {
    this.router.navigate([`/post/edit/${slug}`]);
  }
}
