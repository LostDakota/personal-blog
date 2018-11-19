import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(
    private authenticationService: AuthenticationService
  ) {};

  ngOnInit(){
    this.isAuthenticated = this.authenticationService.isAuthenticated();
  }

  logout(){
    localStorage.clear();
    document.location.href = '/';
  }
}
