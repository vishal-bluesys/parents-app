import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MessageDetailsPage } from '../message-details/message-details';
/**
 * Generated class for the InboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
   
   items = [];
   currentStudent;
   page=0;
   total=0;
   infiniteScroll:any=true;
  constructor(public navCtrl: NavController, public navParams: NavParams , public rest:RestProvider,public modal:ModalController ) {
    this.currentStudent = JSON.parse(localStorage.getItem('currentStudent'));
   this.getMessages(0);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
  }


  getMessages(pageNo){
     this.rest.getInboxMsg(pageNo,this.currentStudent.id).subscribe(data=>{
         
         let msgarr = data.msg;
         let items = this.items;
         msgarr.forEach(function(item,value){
            
            items.push({ id:item.id, 'name': item.name, 'msg_content':item.msg_content,'msg_read_flag':item.msg_read_flag,'msg_sent_date':item.msg_sent_date});

         });
		  
          console.log(this.items);
          this.total =data.total;
          this.page = Number(this.page)+1;

     })
   
  }

  doRefresh(refresher){

  this.page=0;
  this.items=[];
  this.getMessages(this.page);
  refresher.complete();

  }
 
 readMsg(item:any){

   let msgModal = this.modal.create(MessageDetailsPage,{params:item});
       msgModal.present();

 }


    doInfinite(infiniteScroll){

      this.infiniteScroll = infiniteScroll;
      
       this.rest.getInboxMsg(this.page,this.currentStudent.id).subscribe(data=>{
         
         let msgarr = data.msg;
         let items = this.items;
         msgarr.forEach(function(item,value){
            
            items.push({ id:item.id, 'name': item.name, 'msg_content':item.msg_content,'msg_read_flag':item.msg_read_flag,'msg_sent_date':item.msg_sent_date});

         });
		  
          console.log(this.items);
          this.total =data.total;
          this.page = Number(this.page)+1;
          let item_length = items.length;
	        //console.log(item_length);
	        if(item_length ==  this.total){
	          infiniteScroll.enable(false);

	        }else{
	        infiniteScroll.enable(true);
	        }


     })


      

  }


}
