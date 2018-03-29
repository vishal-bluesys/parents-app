import { Component } from '@angular/core';

/**
 * Generated class for the ItemMsgComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'item-msg',
  templateUrl: 'item-msg.html'
})
export class ItemMsgComponent {

  text: string;

  constructor() {
    console.log('Hello ItemMsgComponent Component');
    this.text = 'Hello World';
  }

}
