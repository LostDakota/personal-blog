import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Summary } from './summary.pipe';
import { Safe } from './safe.html.pipe';

@NgModule({
  declarations: [
    Summary,
    Safe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Summary,
    Safe
  ]
})
export class SharedModule { }
