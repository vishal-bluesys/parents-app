import { NgModule } from '@angular/core';
import { ItemMsgComponent } from './item-msg/item-msg';
import { MsgDetailComponent } from './msg-detail/msg-detail';
@NgModule({
	declarations: [ItemMsgComponent,
    MsgDetailComponent],
	imports: [],
	exports: [ItemMsgComponent,
    MsgDetailComponent]
})
export class ComponentsModule {}
