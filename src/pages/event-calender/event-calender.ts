import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
//import * as moment from 'moment';
/**
 * Generated class for the EventCalenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-calender',
  templateUrl: 'event-calender.html',
})
export class EventCalenderPage {
  
      calendertype: string = "listing";
      eventSource = [];
	  viewTitle: string;
	  selectedDay = new Date();
	  currentUser:any;
	  calendar = {
	    mode: 'month',
	    currentDate: new Date()
	  };

  constructor(public navCtrl: NavController, public navParams: NavParams,public rest:RestProvider) {
  	this.currentUser = JSON.parse(localStorage.getItem('currentStudent'));
  	this.getEvents();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCalenderPage');
    
  }


  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 

  getEvents(){
     let sch_id = this.currentUser.std_sch_id;

    this.rest.getCalenderEvents(sch_id).subscribe(events=>{
         let evnVar = this;
         //console.log(events);
        if(events.length){
          
        	events.forEach(function(item,value){
                console.log(evnVar.eventSource);
                 evnVar.eventSource.push({
		            title: item.title,
		            startTime: new Date(item.date),
		            endTime: new Date(item.enddate),
		            startdate: item.date,
		            enddate: item.end_date,
		            starttime:item.start_time,
		            endtime : item.end_time,
                    is_holiday:(item.is_holiday==1)? true: false,
		            allDay: (item.fullday_event==1)? true :false
		        });
            
        	});

        	
        }

       });





  }


  onEventSelected(event) {
   
  
  }
 
  onTimeSelected(ev) {
   
  }

}
