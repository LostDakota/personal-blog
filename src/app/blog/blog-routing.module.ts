import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    data: {
      title: 'Blog - Mika House Web Development'      
    },
    children: [
      {
        path: ':tag',
        component: BlogComponent,
        data: {
          title: 'Blog - Mika House Web Development'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
