import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListPageComponent } from './list-page.component';

@NgModule({
  declarations: [ListPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPageComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]),
  ],
})
export class ListPageModule {}
