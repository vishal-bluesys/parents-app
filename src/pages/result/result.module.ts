import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultPage } from './result';
import { ResultDetailsPageModule } from '../result-details/result-details.module';

@NgModule({
  declarations: [
    ResultPage,

  ],
  imports: [
    ResultDetailsPageModule,
    IonicPageModule.forChild(ResultPage),
  ],
})
export class ResultPageModule {}
