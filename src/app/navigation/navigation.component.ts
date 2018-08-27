import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {

  currentUrl: string;

  constructor(private router: Router) { 
    router.events.pipe(
      filter((event:Event) => event instanceof NavigationEnd)
    ).subscribe(
      res => this.currentUrl = res["url"]
    )
  }

  ngOnInit() {
  }

}
