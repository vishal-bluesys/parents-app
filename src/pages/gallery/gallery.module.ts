import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleryPage } from './gallery';
//import { GalleryPhotosPageModule } from '../gallery-photos/gallery-photos.module';
@NgModule({
  declarations: [
    GalleryPage,
  ],
  imports: [
    //GalleryPhotosPageModule,
    IonicPageModule.forChild(GalleryPage),
  ],
})
export class GalleryPageModule {}
