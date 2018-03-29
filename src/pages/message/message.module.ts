import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagePage } from './message';


import { InboxPageModule } from '../../pages/inbox/inbox.module';
import { TrashPageModule } from '../../pages/trash/trash.module';

@NgModule({
  declarations: [
    MessagePage,
 ],
  imports: [
    InboxPageModule,
    TrashPageModule,
    IonicPageModule.forChild(MessagePage),
  ],
})
export class MessagePageModule {}
