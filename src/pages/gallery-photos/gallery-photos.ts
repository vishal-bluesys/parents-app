import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { END_POINTS } from '../../app.config'; 
import { PhotoSliderPage } from '../photo-slider/photo-slider';

/**
 * Generated class for the GalleryPhotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery-photos',
  templateUrl: 'gallery-photos.html',
})
export class GalleryPhotosPage {
  
  photos=[];
  photoChunk=[];
  currentStudent;
  url= END_POINTS.baseUrl+"uploads/images/";
   title:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest :  RestProvider, public modal:ModalController) {

    this.currentStudent = JSON.parse(localStorage.getItem('currentStudent'));
    this.title = this.navParams.get('title');
    this.getImages();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPhotosPage');
  }

  getImages(){
     let categoryid = this.navParams.get('id'); 

     this.rest.getGalleryImages(categoryid).subscribe(data=>{
   
        this.photos = this.chunkArray(data,4);

     })
   


  }

   chunkArray(myArray, chunk_size){
	    let index = 0;
	    let arrayLength = myArray.length;
	    let tempArray = [];
	    
	    for (index = 0; index < arrayLength; index += chunk_size) {
	        let myChunk = myArray.slice(index, index+chunk_size);
	         // Do something if you want with the group
	        tempArray.push(myChunk);
	    }

	    return tempArray;
    }


  openImage(item){

     let imageSlider = this.modal.create(PhotoSliderPage,{param:item,title: this.title});

         imageSlider.present();
   

  }

}
