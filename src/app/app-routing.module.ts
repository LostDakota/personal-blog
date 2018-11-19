import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { AuthGuardService } from './auth-guard.service';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Mika House Web Development'
    }
  },
  {
    path: 'blog',
    component: BlogComponent,
    data: {
      title: 'Mika House Web Development - Blog'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'Mika House Web Development - About'
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      title: 'Mika House Web Development - Contact'
    }
  },
  {
    path: 'blog/:id',
    component: PostComponent
  },
  {
    path: 'blog/edit/:id',
    component: EditComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
