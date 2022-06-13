import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSearchComponent } from './features/user-search/user-search.component';

const routes: Routes = [
  {
    path: '',
    component: UserSearchComponent,
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./features/user-search-result/user-search-result.module').then(
        (m) => m.UserSearchResultModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
