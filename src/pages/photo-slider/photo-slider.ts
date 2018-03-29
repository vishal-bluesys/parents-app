import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { END_POINTS } from '../../app.config'; 
/**
 * Generated class for the PhotoSliderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo-slider',
  templateUrl: 'photo-slider.html',
})
export class PhotoSliderPage {
   imageData:any;
   currentStudent:any;
    title:any;
     url= END_POINTS.baseUrl+"uploads/images/";
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
   
    this.imageData = this.navParams.get('param');
    this.title = this.navParams.get('title');
    this.currentStudent = JSON.parse(localStorage.getItem('currentStudent'));
   console.log(this.imageData);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoSliderPage');
  }


  LoadImage(){


  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
