import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { TitleService } from './title.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  
})

export class AppComponent implements OnInit {

  isAuthenticated: boolean;
  title: string;

  constructor(
    private authenticationService: AuthenticationService,
    private titleService: TitleService,
    private router: Router
  ) { 
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.title = this.router.routerState.snapshot.root.firstChild.data['title'] || 'Mika House Web Development';
      this.titleService.setTitle(this.title);
    });
   };

  ngOnInit(){
    this.isAuthenticated = this.authenticationService.isAuthenticated();
  }

  logout(){
    localStorage.clear();
    document.location.href = '/';
  }
}
