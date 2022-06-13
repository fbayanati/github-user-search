import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from './models';
import * as UserActions from './user.actions';

export const usersFeatureKey = 'users';

export interface State extends EntityState<User> {
  totalCount: number;
  searchValue: string;
  searchPage: number;
  selectedUserId: string | null;
  isLoading: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  totalCount: 0,
  searchValue: '',
  searchPage: 0,
  selectedUserId: null,
  isLoading: false,
});

export const reducer = createReducer(
  initialState,
  on(UserActions.addUser, (state, action) =>
    adapter.addOne(action.user, state)
  ),
  on(UserActions.upsertUser, (state, action) =>
    adapter.upsertOne(action.user, state)
  ),
  on(UserActions.addUsers, (state, action) =>
    adapter.addMany(action.users, state)
  ),
  on(UserActions.upsertUsers, (state, action) =>
    adapter.upsertMany(action.users, state)
  ),
  on(UserActions.updateUser, (state, action) =>
    adapter.updateOne(action.user, state)
  ),
  on(UserActions.updateUsers, (state, action) =>
    adapter.updateMany(action.users, state)
  ),
  on(UserActions.deleteUser, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(UserActions.deleteUsers, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(UserActions.loadUsers, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(UserActions.loadUsersSuccess, (state, action) => {
    const updatedState = action.users?.length
      ? adapter.setAll(action.users, state)
      : adapter.removeAll(state);

    return {
      ...updatedState,
      totalCount: action.totalCount,
      searchValue: action.searchValue,
      searchPage: action.searchPage,
      isLoading: false,
    };
  }),
  on(UserActions.loadUsersFailure, (state) => {
    const updatedState = adapter.removeAll(state);
    return {
      ...updatedState,
      totalCount: 0,
      searchValue: '',
      searchPage: 0,
      isLoading: false,
    };
  }),
  on(UserActions.clearUsers, (state) => adapter.removeAll(state))
);

export const getSelectedUserId = (state: State) => state.selectedUserId;

const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

// select the array of user ids
export const selectUserIds = selectIds;

// select the dictionary of user entities
export const selectUserEntities = selectEntities;

// select the array of users
export const selectAllUsers = selectAll;

// select the total user count
export const selectUserTotal = selectTotal;
