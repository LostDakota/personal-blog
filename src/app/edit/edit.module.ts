import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule
  ],
  exports: [EditComponent]
})
export class EditModule { }
