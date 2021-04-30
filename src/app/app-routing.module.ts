import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDataComponent } from './list-data/list-data.component'

const routes: Routes = [
  {
    path: 'list',
    component: ListDataComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
