import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreState } from '../../store';

import * as UserActions from '../../store/user/user.actions';

@Component({
  selector: 'gus-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent {
  searchForm = this.fb.group({
    user: [''],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<StoreState>,
    private router: Router
  ) {}

  onSubmit() {
    const searchValue = this.searchForm.controls['user'].value;
    if (searchValue != null) {
      this.store.dispatch(UserActions.loadUsers({ searchValue }));
      this.router.navigate(['search']);
    }
  }
}
