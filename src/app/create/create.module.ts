import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create.routing.module';
import { CreateComponent } from './create.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    CreateRoutingModule,
    QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateComponent,
    FormsModule,
    ReactiveFormsModule,
    CreateRoutingModule
  ],
  providers: [RouterModule]
})
export class CreateModule { }
