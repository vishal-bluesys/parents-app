import { HttpClient } from '@angular/common/http';
import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { END_POINTS } from '../../app.config'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the UserAuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserAuthenticationProvider {

  constructor(public http: HttpClient,public toastCtrl:ToastController) {
    console.log('Hello UserAuthenticationProvider Provider');
  }

 // base_url:string = "http://localhost/school-app-backend/public/" 
   base_url : string = END_POINTS.baseUrl;

   userAuthentication(username:string,password:string){
        let  userCredentials = {
        	                    "grant_type":'password',
        	                    "client_id":"8",
        	                    "client_secret":"R0mB4Of8vek0gag59u0DpongD8mymYvng3OFIjcO",
        	                    "username":username,
                                "password":password,
                                "scope":""
 						       } 
         return this.http.post<any>(this.base_url+"oauth/token",userCredentials).map(data => {
                // login successful if there's a jwt token in the response
                if (data && data.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('AuthToken', JSON.stringify(data));
                }
 
                return data;
            }).catch(this.handleError);
    						

   }


   getAuthUser(){

        return this.http.get<any>(this.base_url+"api/parent/user").map(user=>{

           if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    
                }
 
            return user;
        }).catch(this.handleError);

     

   }


   getStudents(id){
   
       return this.http.get<any>(this.base_url+"api/parent/students/"+id).map(students=>{

           if (students) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('students', JSON.stringify(students));
                    localStorage.setItem('currentStudent',JSON.stringify(students[0]));
                }
 
            return students;
        }).catch(this.handleError);


   }


   checkLoggedIn(){
        let token = JSON.parse(localStorage.getItem('AuthToken'));

        if(token && token.access_token){

          return true;
        }else{

          return false;
        }
 

   }


   doLoggout(){
     
     localStorage.clear()
        return true;
       }


    registerToken(token){
      
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let Parameter = { 
                       "user_id": currentUser.id,
                       "FCM_token":token
                       
                       }

      this.http.post(this.base_url+"/api/registerToken",Parameter).map(data => {
                
                  return data;
            }).catch(this.handleError);

    }



    private handleError (error: Response | any) {
	  let errMsg: string;
	  if (error instanceof Response) {
	    let body = error.json() || '';
	    let err = JSON.stringify(body);
	    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
         this.toastCtrl.create({
              message:  errMsg,
              duration: 3000,
              position: 'bottom',
              cssClass: "success",
            }).present();


	  } else {
	    errMsg = error.message ? error.message : error.toString();
	  }
	  //console.error(errMsg);
	  return Observable.throw(errMsg);
  }
}
