import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrashPage } from './trash';
import { MessageDetailsPageModule } from '../message-details/message-details.module';

@NgModule({
  declarations: [
    TrashPage,
  ],
  imports: [
  MessageDetailsPageModule,
    IonicPageModule.forChild(TrashPage),
  ],
})
export class TrashPageModule {}
