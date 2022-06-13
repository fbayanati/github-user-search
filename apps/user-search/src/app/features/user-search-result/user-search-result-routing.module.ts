import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSearchResultComponent } from './user-search-result.component';

const routes: Routes = [{ path: '', component: UserSearchResultComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSearchResultRoutingModule {}
