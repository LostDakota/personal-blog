import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';


import { Summary } from './summary.pipe';
import { TitleService } from './title.service';

export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    BlogComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    PostComponent,
    LoginComponent,
    CreateComponent,
    EditComponent,
    Summary    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QuillModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/create']
      }
    })
  ],
  providers: [
    TitleService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
