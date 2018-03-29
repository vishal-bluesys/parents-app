import { Injectable ,NgModule} from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor ,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastController,LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/do';

/*
  Generated class for the JwtInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JwtInterceptorProvider implements HttpInterceptor {
  loader:any;
  constructor(public toastCtrl:ToastController,public loadingCtrl: LoadingController) {
    console.log('Hello UserAuthenticationProvider Provider');
  }
 
  /* for loading  */
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      spinner:'dots',
      });
    this.loader.present();
    }


 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('AuthToken'));
       // console.log(currentUser.token);
        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.access_token}`
                }
            });
        }
        this.presentLoading();
        console.log(request);
        
         return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.loader.dismiss(); 
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
          console.log(err);
           this.toastCtrl.create({
              message:  err.error.message,
              duration: 3000,
              position: 'bottom',
              cssClass: "success",
            }).present();

           this.loader.dismiss(); 

          console.log("Unauthorised access");

        }
      }
    });
    }
}

@NgModule({
 providers: [
 { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorProvider, multi: true }
 ]
})
export class InterceptorModule { }
