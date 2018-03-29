import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ResultDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result-details',
  templateUrl: 'result-details.html',
})
export class ResultDetailsPage {
currentstudent:any;
results:any;
test_id:any;
test_name :any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController ,public rest:RestProvider) {
  	this.currentstudent = JSON.parse(localStorage.getItem('currentStudent'));
     
   this.test_id = this.navParams.get('testid');
   this.test_name = this.navParams.get('testname');
   this.getResult();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultDetailsPage');
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }


  getResult(){


    this.rest.getResult(this.test_id,this.currentstudent.id).subscribe(result=>{

    this.results =result;


   })

  }
}
