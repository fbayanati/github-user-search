import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user.effects';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature(fromUser.usersFeatureKey, fromUser.reducer), EffectsModule.forFeature([UserEffects])],
})
export class UserStoreModule {}
