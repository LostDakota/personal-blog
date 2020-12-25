import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';

const routes: Routes = [  
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then(m => m.PostModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then(m => m.CreateModule),
  },
  {
    path: '**',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { preloadingStrategy: NoPreloading }
  )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
