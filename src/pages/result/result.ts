import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController} from 'ionic-angular';
import { ResultDetailsPage } from '../result-details/result-details';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  currentUser:any;
  results:any;
  tests:any;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public modal:ModalController ,public rest:RestProvider) {
  	this.currentUser = JSON.parse(localStorage.getItem('currentStudent'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
    this.getTest();
  }

  openModel(testId){
    

   let profileModal = this.modal.create(ResultDetailsPage);
   profileModal.present();



  }

  getResult(testId,testname){

    
  	let profileModal = this.modal.create(ResultDetailsPage,{testid:testId,testname:testname});
     profileModal.present();

   


  }


  getTest(){

  	this.rest.getTests().subscribe(test=>{

  		this.tests= test;
  	})
  }




}
