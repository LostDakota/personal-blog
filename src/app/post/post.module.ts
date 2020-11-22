import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { SharedModule } from '../shared/shared/shared.module';
import { PostRoutingModule } from './post-routing.module';
import { EditModule } from '../edit/edit.module';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    SharedModule,
    PostRoutingModule,
    EditModule
  ],
  exports: [PostComponent]
})

export class PostModule { }
