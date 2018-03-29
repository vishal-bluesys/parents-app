import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the MessageDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-details',
  templateUrl: 'message-details.html',
})
export class MessageDetailsPage {
   msg_data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController ,public rest:RestProvider){
  
   this.msg_data=this.navParams.get('params');
   console.log(this.msg_data);
  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDetailsPage');
  }

   dismiss() {
    this.viewCtrl.dismiss();
  }


}
