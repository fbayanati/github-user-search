import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRendererComponent } from './user-renderer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [UserRendererComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [UserRendererComponent],
})
export class UserRendererModule {}
