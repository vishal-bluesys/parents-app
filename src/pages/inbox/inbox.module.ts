import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InboxPage } from './inbox';
import { MessageDetailsPageModule } from '../message-details/message-details.module';
@NgModule({
  declarations: [
    InboxPage,
  ],
  imports: [
    MessageDetailsPageModule,
    IonicPageModule.forChild(InboxPage),
  ],
})
export class InboxPageModule {}
