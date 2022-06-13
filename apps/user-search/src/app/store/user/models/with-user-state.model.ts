import { State, usersFeatureKey } from '../user.reducer';

export interface WithUserState {
  [usersFeatureKey]: State;
}
