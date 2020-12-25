import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';

const routes: Routes = [  
  {
    path: 'blog',
    loadChildren: async () => (await import('./blog/blog.module')).BlogModule
  },
  {
    path: 'login',
    loadChildren:  async () => (await import('./login/login.module')).LoginModule
  },
  {
    path: 'post',
    loadChildren: async () => (await import('./post/post.module')).PostModule
  },
  {
    path: 'about',
    loadChildren: async () => (await import('./about/about.module')).AboutModule
  },
  {
    path: 'contact',
    loadChildren: async () => (await import('./contact/contact.module')).ContactModule
  },
  {
    path: 'create',
    loadChildren: async () => (await import('./create/create.module')).CreateModule
  },
  {
    path: '**',
    loadChildren: async () => (await import('./home/home.module')).HomeModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { preloadingStrategy: NoPreloading }
  )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
