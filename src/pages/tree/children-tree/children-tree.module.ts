import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildrenTreePage } from './children-tree';

@NgModule({
  declarations: [
    ChildrenTreePage,
  ],
  imports: [
    IonicPageModule.forChild(ChildrenTreePage),
  ],
})
export class ChildrenTreePageModule {}
