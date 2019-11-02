import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})

export class NavigationComponent {

  isAuthenticated: boolean;
  currentUrl: string;

  constructor(
    private router: Router, 
    private authenticationService: AuthenticationService
  ) { 
    this.isAuthenticated = this.authenticationService.isAuthenticated();
    this.router.events.pipe(
      filter<NavigationEnd>((event) => event instanceof NavigationEnd)
    ).subscribe(
      res => this.currentUrl = res["url"]
    )
  };
}
