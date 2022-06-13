import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { User } from 'apps/user-search/src/app/store/user/models';

@Component({
  selector: 'gus-user-renderer',
  templateUrl: './user-renderer.component.html',
  styleUrls: ['./user-renderer.component.scss'],
})
export class UserRendererComponent implements ICellRendererAngularComp {
  user: User | undefined;

  constructor() {}

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  agInit(params: ICellRendererParams): void {
    this.user = params.data as User;

    console.log('user :: ', this.user);
  }

  onHomeClick(): void {
    window.open(this.user?.html_url, '_blank');
  }
}
