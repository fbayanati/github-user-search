import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UserSearchResultRoutingModule } from './user-search-result-routing.module';
import { UserSearchResultComponent } from './user-search-result.component';
import { AgGridModule } from 'ag-grid-angular';
import { UserRendererModule } from './components/user-renderer/user-renderer.module';

@NgModule({
  declarations: [UserSearchResultComponent],
  imports: [
    CommonModule,
    UserSearchResultRoutingModule,
    AgGridModule,
    MatButtonModule,
    MatIconModule,
    UserRendererModule,
  ],
})
export class UserSearchResultModule {}
