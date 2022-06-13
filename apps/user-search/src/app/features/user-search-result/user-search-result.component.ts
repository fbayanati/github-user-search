import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { StoreState } from '../../store';
import { User } from '../../store/user/models';

import * as UserActions from '../../store/user/user.actions';
import * as UserSelectors from '../../store/user/user.selectors';
import { UserRendererComponent } from './components/user-renderer/user-renderer.component';

@Component({
  selector: 'gus-user-search-result',
  templateUrl: './user-search-result.component.html',
  styleUrls: ['./user-search-result.component.scss'],
})
export class UserSearchResultComponent implements OnDestroy {
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'login', flex: 1, cellRenderer: UserRendererComponent },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  readonly perPage = 20;

  searchedUsers$: Observable<User[]>;
  searchedUsersTotalCount$: Observable<number>;
  searchedUsersTotalPages$: Observable<number>;
  seachValue$: Observable<string>;
  seachPage$: Observable<number>;

  searchValue = '';
  searchPage = 1;
  totalPage = 0;

  private readonly destroy$: Subject<void>;
  readonly rowHeight = 44;

  constructor(private store: Store<StoreState>, private router: Router) {
    this.destroy$ = new Subject<void>();

    this.seachValue$ = this.store.pipe(
      select(UserSelectors.selectUserSearchValue)
    );

    this.seachPage$ = this.store.pipe(
      select(UserSelectors.selectUserSearchPage)
    );

    this.searchedUsers$ = this.store.pipe(select(UserSelectors.selectAllUsers));
    this.searchedUsersTotalCount$ = this.store.pipe(
      select(UserSelectors.selectUsersTotalCount)
    );
    this.searchedUsersTotalPages$ = this.searchedUsersTotalCount$.pipe(
      map((count) => Math.ceil(count / this.perPage))
    );

    this.seachValue$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.searchValue = value;
    });

    this.seachPage$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.searchPage = value;
    });

    this.searchedUsersTotalPages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.totalPage = value;
      });
  }

  onGridReady(params: GridReadyEvent) {
    console.log(':: onGridReady ::');
  }

  onBackToSearch(): void {
    this.router.navigate(['/']);
  }

  onFirstPage(): void {
    if (this.searchPage === 1) {
      return;
    }

    this.store.dispatch(
      UserActions.loadUsers({ searchValue: this.searchValue, page: 1 })
    );
  }

  onPreviousPage(): void {
    if (this.searchPage === 1) {
      return;
    }

    this.store.dispatch(
      UserActions.loadUsers({
        searchValue: this.searchValue,
        page: this.searchPage - 1,
      })
    );
  }

  onNextPage(): void {
    if (this.searchPage === this.totalPage) {
      return;
    }

    if ((this.searchPage + 1) * this.perPage > 1000) {
      window.alert(
        'the GitHub Search API provides up to 1,000 results for each search! \n' +
          'https://docs.github.com/en/rest/search'
      );
      return;
    }

    this.store.dispatch(
      UserActions.loadUsers({
        searchValue: this.searchValue,
        page: this.searchPage + 1,
      })
    );
  }

  onLastPage(): void {
    if (this.searchPage === this.totalPage) {
      return;
    }

    if (this.totalPage * this.perPage > 1000) {
      window.alert(
        'the GitHub Search API provides up to 1,000 results for each search! \n' +
          'https://docs.github.com/en/rest/search'
      );
      return;
    }

    this.store.dispatch(
      UserActions.loadUsers({
        searchValue: this.searchValue,
        page: this.totalPage,
      })
    );
  }

  get isFirstPageDisabled(): boolean {
    return this.searchPage === 1;
  }

  get isPreviousPageDisabled(): boolean {
    return this.searchPage === 1;
  }

  get isNextPageDisabled(): boolean {
    return this.searchPage === this.totalPage;
  }

  get isLastPageDisabled(): boolean {
    return this.searchPage === this.totalPage;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
