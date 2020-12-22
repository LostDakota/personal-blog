import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { SharedModule } from '../shared/shared/shared.module';
import { PostRoutingModule } from './post-routing.module';
import { EditModule } from '../edit/edit.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    SharedModule,
    PostRoutingModule,
    EditModule,
    RouterModule
  ],
  exports: [
    PostComponent,
    PostRoutingModule,
    RouterModule
  ]
})

export class PostModule { }
