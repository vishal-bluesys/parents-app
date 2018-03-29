import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleryPhotosPage } from './gallery-photos';
import { PhotoSliderPageModule } from '../photo-slider/photo-slider.module';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    GalleryPhotosPage,

  ],
  imports: [
  PhotoSliderPageModule,
  IonicImageViewerModule,
    IonicPageModule.forChild(GalleryPhotosPage),
  ],
})
export class GalleryPhotosPageModule {}
