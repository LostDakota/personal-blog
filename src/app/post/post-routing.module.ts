import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from '../edit/edit.component';
import { PostComponent } from './post.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':slug',
        component: PostComponent
      },
      {
        path: 'edit/:slug',
        component: EditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
