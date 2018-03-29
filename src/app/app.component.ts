import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { UserAuthenticationProvider } from '../providers/user-authentication/user-authentication';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}



@Component({
  templateUrl: 'app.html'
})




export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  //pages: Array<{title: string, component: any}>;: PageInterface[]
  pages: PageInterface[];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public UserAuth : UserAuthenticationProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages  = [
      { title: 'Dashboard', pageName: 'HomePage', icon: 'md-home' },
      { title: 'Messages', pageName: 'MessagePage', icon: 'md-text' },
      { title: 'Time Table', pageName: 'TimetablePage', icon: 'md-browsers' },
      //{ title: 'Syllabus', pageName: 'SyllabusPage' , icon: 'md-list-box'},
      { title: 'Calender', pageName: 'EventCalenderPage',  icon: 'md-calendar'},
      { title: 'Gallery', pageName: 'GalleryPage',  icon: 'md-images'},
      { title: 'Result', pageName: 'ResultPage',  icon: 'md-clipboard'},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: PageInterface) {
    let params = {};
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNavs() && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      console.log(page.pageName);
      this.nav.setRoot(page.pageName, params);
    }
  }


  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNavs()[0];
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
 
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

  logout(){

    if(this.UserAuth.doLoggout()){
          this.nav.setRoot(LoginPage);
          
       }

  }


}
