import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [  
  {
    path: 'blog',
    loadChildren: './blog/blog.module#BlogModule'
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'post',
    loadChildren: './post/post.module#PostModule'
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule'
  },
  {
    path: 'contact',
    loadChildren: './contact/contact.module#ContactModule'
  },
  {
    path: 'create',
    loadChildren: './create/create.module#CreateModule',
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    loadChildren: './home/home.module#HomeModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { preloadingStrategy: PreloadAllModules }
  )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
