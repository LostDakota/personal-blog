import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  isAuthenticated: boolean;
  title = 'developer-blog';

  constructor(private authenticationService: AuthenticationService){}

  ngOnInit(){
    this.isAuthenticated = this.authenticationService.isAuthenticated();
  }
}
