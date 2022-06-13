import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/user-search/src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { MapUserSearch, User } from '../models';

import pick from 'lodash/pick';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly perPage = 20;

  constructor(private http: HttpClient, private router: Router) {}

  users(searchValue: string, page: number = 1): Observable<MapUserSearch> {
    let params = new HttpParams();
    params = params.append('q', searchValue);
    params = params.append('page', page);
    params = params.append('per_page', this.perPage);

    const extractdata = (
      response: Required<{ total_count: number; items: unknown[] }>
    ): MapUserSearch => ({
      totalCount: response.total_count,
      users: response.items.map(
        (item) =>
          pick(item, ['id', 'login', 'avatar_url', 'url', 'html_url']) as User
      ),
      searchValue,
      searchPage: page,
    });

    return this.http
      .get(environment.api.usersSearch, {
        headers: new HttpHeaders({}),
        params,
      })
      .pipe(
        map((response) =>
          extractdata(
            response as Required<{ total_count: number; items: unknown[] }>
          )
        ),
        catchError(this.onError)
      );
  }

  onError(error: HttpErrorResponse): Observable<never> {
    window.alert(
      error.error?.message ?? 'GitHub User Search API is encountered with error'
    );
    return throwError(() => new Error('GitHub User Search is failing!'));
  }
}
