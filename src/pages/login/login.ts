import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController,Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import { HomePage } from '../../pages/home/home';
import { FCM } from '@ionic-native/fcm';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
   loginForm : FormGroup;
   loader:any;
   fcm_token : any;
   
   connected: any;
   disconnected : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,fb: FormBuilder,public UserAuth : UserAuthenticationProvider,public loadingCtrl: LoadingController,private toastCtrl: ToastController,public fcm:FCM,public platform :Platform,private device: Device,public network : Network) {
  
  

  	 this.loginForm = fb.group({
          'username' : [null, Validators.compose([
                         Validators.required,
                               ])],
          'password': [null, Validators.required],
        })
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
     setTimeout(this.checkLoggedIn(),5000);
  }
 

    ionViewDidEnter(){
            this.connected = this.network.onConnect().subscribe(data=>{
            
             this.displayNetworkUpdate(data.type);
            },error=>{
                
                console.log(error);

            });

            
           this.disconnected = this.network.onDisconnect().subscribe(data=>{
               this.displayNetworkUpdate(data.type);

            },error=>{

               console.log(error);
            });


     }


      ionViewWillLeave(){
          this.connected.unsubscribe();
          this.disconnected.unsubscribe();
        }




  checkLoggedIn(){
     
   
     if(this.UserAuth.checkLoggedIn()){
       
       this.navCtrl.setRoot(HomePage)
     }

  }

  login(){
      // console.log(this.loginForm.value.username);
       
       
       this.UserAuth.userAuthentication(this.loginForm.value.username,this.loginForm.value.password)
        .subscribe(res=>{
             console.log(res);
             if(res && res.access_token){
               
            this.toastCtrl.create({
              message: 'Login successful',
              duration: 3000,
              position: 'bottom',
              cssClass: "success",
            }).present();
            
             this.UserAuth.getAuthUser().subscribe(user=>{
               
               this.UserAuth.getStudents(user.id).subscribe(data=>{
                   
                   this.getFCM();

                   this.navCtrl.setRoot(HomePage);

               },err=>{


               });
                

             },error=>{

               //this.loader.dismiss(); 

             });
             
             
          }
        else{
            
            this.toastCtrl.create({
              message: 'Login Fail',
              duration: 10000,
              position: 'top'
            }).present();

        }

             

       },
       error=>{
       	console.log(error);
       });



  }


  getFCM(){
  
   if(this.device.platform =="Android" || this.device.platform =="Ios" ){
        this.fcm.getToken().then(token => {
               console.log("token",token);
               this.UserAuth.registerToken(token);
           });

   }
   
     



  }
 

 displayNetworkUpdate(connectionState: string){
      let networkType = this.network.type;

          this.toastCtrl.create({
            message: `You are now ${connectionState} via ${networkType}`,
            duration: 3000,
            position: 'bottom',
            showCloseButton : true,
            
          }).present();


     }



}
