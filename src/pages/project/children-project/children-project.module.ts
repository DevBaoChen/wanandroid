import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildrenProjectPage } from './children-project';

@NgModule({
  declarations: [
    ChildrenProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(ChildrenProjectPage),
  ],
})
export class ChildrenProjectPageModule {}
