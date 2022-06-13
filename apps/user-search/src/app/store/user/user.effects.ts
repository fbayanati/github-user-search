import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from './api/user.service';

import * as UserActions from './user.actions';

import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap((action) =>
        this.userService.users(action.searchValue, action.page ?? 1).pipe(
          map(({ totalCount, users, searchValue, searchPage }) =>
            UserActions.loadUsersSuccess({
              totalCount,
              users,
              searchValue,
              searchPage,
            })
          ),
          catchError(() => {
            this.router.navigate(['/']);
            return of(UserActions.loadUsersFailure());
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}
}
