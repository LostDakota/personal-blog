import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create.routing.module';
import { CreateComponent } from './create.component';
import { QuillModule } from 'ngx-quill';
import { AuthGuardService } from '../services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    CreateRoutingModule,
    QuillModule,
    AuthGuardService,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CreateComponent]
})
export class CreateModule { }
