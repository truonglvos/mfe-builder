import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'id/:id',
    loadChildren: () =>
      import('./@pages/builder/builder.module').then(
        (mod) => mod.BuilderModule
      ),
  },
  {
    path: 'list-page',
    loadChildren: () =>
      import('./@pages/list-page/list-page.module').then(
        (mod) => mod.ListPageModule
      ),
  },
  {
    path: '**',
    redirectTo: 'list-page',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
