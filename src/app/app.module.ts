import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';

import { TitleService } from './services/title.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ScriptService } from './services/dom.service';

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3001'],
        disallowedRoutes: ['localhost:3001/create']
      }
    })
  ],
  exports: [
    NavigationComponent,
    FooterComponent
  ],
  providers: [
    TitleService,
    AuthGuardService,
    ScriptService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
