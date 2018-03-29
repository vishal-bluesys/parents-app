import { Component } from '@angular/core';

/**
 * Generated class for the MsgDetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'msg-detail',
  templateUrl: 'msg-detail.html'
})
export class MsgDetailComponent {

  text: string;

  constructor() {
    console.log('Hello MsgDetailComponent Component');
    this.text = 'Hello World';
  }

}
