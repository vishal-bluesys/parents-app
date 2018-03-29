import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the TimetablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-timetable',
  templateUrl: 'timetable.html',
})
export class TimetablePage {
   
      currentUser:any;
     d = new Date();
    day =  this.d.getDay();
    dayschedule=[];

    weekdays=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Satureday'];
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest:RestProvider) {
  	 this.currentUser = JSON.parse(localStorage.getItem('currentStudent'));
  	 this. showTimeTable();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimetablePage');
  }

  showTimeTable(){
    
    this.rest.getTimeTable(this.day,this.currentUser.std_div_id,this.currentUser.std_class_id).subscribe(schedule=>{
    	this.dayschedule = schedule;
    })

  }

}
