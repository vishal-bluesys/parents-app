import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { GalleryPhotosPage } from '../gallery-photos/gallery-photos';
import { END_POINTS } from '../../app.config'; 

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
 
  albums=[];
  albumChunk=[];
  currentStudent;
  url= END_POINTS.baseUrl+"uploads/images/";
  constructor(public navCtrl: NavController, public navParams: NavParams , public rest:RestProvider) {
  	this.currentStudent = JSON.parse(localStorage.getItem('currentStudent'));
  	this.getGalleryCategories(this.currentStudent.std_sch_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
  }


  getGalleryCategories(school_id){
   
    this.rest.getGalleryCategories(school_id).subscribe(data=>{
     
     
    /* for(let i=0;i<data.length/2;i++){
          this.albumChunk=[];
          for(let j=i; j<i+2;j++){
              this.albumChunk.push(data[j])      
             //console.log(data[j]);
          }
          this.albums.push(this.albumChunk); 
         // console.log(this.albums);
     }
      */
    this.albums = this.chunkArray(data,2);


    });

  }



  gotoGalleryPage(id,title){
    //console.log(title);
  	this.navCtrl.push(GalleryPhotosPage,{id:id,title:title});

     

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


}
