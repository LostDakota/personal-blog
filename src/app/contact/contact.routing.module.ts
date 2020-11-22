import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';

const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    data: {
      title: 'Contact - Mika House Web Development'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
