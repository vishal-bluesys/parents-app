import { HttpClient, HttpHeaders,HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { END_POINTS } from '../../app.config'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
 base_url : string = END_POINTS.baseUrl;


  constructor(public http: HttpClient,public toastCtrl:ToastController) {
    console.log('Hello RestProvider Provider');
   
   
  }

  
  getTimeTable(day:number,divid : string ,classid : string){
  	


		 let params1 = new HttpParams().set('classid', classid);
		     params1 = params1.append('divid',divid );
		     params1=  params1.append('day', day.toString());
           
            return this.http.get(this.base_url+"api/parent/schedule",{ params : params1 }).map(schedule=>{

					    return schedule;
					     }).catch(this.handleError);

  }

 getCalenderEvents(sch_id:number){


    return this.http.get(this.base_url+"api/parent/calender/"+sch_id).map(calender=>{

					    return calender;
					     }).catch(this.handleError);

 }

 getResult(test_id:string,stud_id:string){
             
         let params = new HttpParams().set('stud_id', stud_id);
		     params= params.append('test_id',test_id );

    return this.http.get(this.base_url+"api/parent/results",{ params : params }).map(result=>{

					    return result;
					     }).catch(this.handleError);

 
 }

 getTests(){


    return this.http.get(this.base_url+"api/parent/tests").map(tests=>{

					    return tests;
					     }).catch(this.handleError);


 }

  getInboxMsg(pageNo:any,stud_id:any){
  	let params = new HttpParams().set('stud_id',stud_id);
  	    params = params.append('pageNo',pageNo); 

    return this.http.get(this.base_url+"/api/parent/inbox",{params: params}).map(inbox=>{

    	return inbox;
    }).catch(this.handleError);

  }

  getTrashMsg(pageNo:any,stud_id:any){
    let params = new HttpParams().set('stud_id',stud_id);
        params = params.append('pageNo',pageNo); 

    return this.http.get(this.base_url+"/api/parent/trash",{params: params}).map(inbox=>{

      return inbox;
    }).catch(this.handleError);

  }


  getGalleryCategories(school_id:any){
 

    return this.http.get(this.base_url+"/api/parent/gallery/categories/"+school_id).map(category=>{

      return category;
    }).catch(this.handleError);

  }


  getGalleryImages(cat_id:any){

   return this.http.get(this.base_url+"/api/parent/gallery/images/"+cat_id).map(images=>{
  
     return images;
   });

  }


  getGraphData(std_id,class_id){


    return this.http.get(this.base_url+"/api/parent/graphdata/"+std_id+"/"+class_id).map(data=>{
  
     return data;
   });


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
