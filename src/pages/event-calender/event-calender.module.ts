import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventCalenderPage } from './event-calender';
import { NgCalendarModule  } from 'ionic2-calendar';
@NgModule({
  declarations: [
    EventCalenderPage,
  ],
  imports: [
    NgCalendarModule,
    IonicPageModule.forChild(EventCalenderPage),
  ],
})
export class EventCalenderPageModule {

	
}
