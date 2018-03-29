import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPageModule } from '../pages/login/login.module';
import { HomePageModule } from '../pages/home/home.module';
import { ListPageModule } from '../pages/list/list.module';
import { MessagePageModule } from '../pages/message/message.module';
import { InboxPageModule } from '../pages/inbox/inbox.module';
import { TrashPageModule } from '../pages/trash/trash.module';
import { EventCalenderPageModule } from '../pages/event-calender/event-calender.module';
import { GalleryPageModule } from '../pages/gallery/gallery.module';
import { ResultPageModule } from '../pages/result/result.module';
import { SyllabusPageModule } from '../pages/syllabus/syllabus.module';
import { TimetablePageModule } from '../pages/timetable/timetable.module';
import { ComponentsModule } from '../components/components.module';
import { FCM } from '@ionic-native/fcm';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';

import { LoginPage } from '../pages/login/login';
import { MessagePage } from '../pages/message/message';
import { InboxPage } from '../pages/inbox/inbox';
import { TrashPage } from '../pages/trash/trash';
import { EventCalenderPage } from '../pages/event-calender/event-calender';
import { GalleryPage } from '../pages/gallery/gallery';
import { ResultPage } from '../pages/result/result';
import { SyllabusPage } from '../pages/syllabus/syllabus';
import { TimetablePage } from '../pages/timetable/timetable';
import { SecureStorage } from '@ionic-native/secure-storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserAuthenticationProvider } from '../providers/user-authentication/user-authentication';
import { RestProvider } from '../providers/rest/rest';
import { InterceptorModule } from '../providers/jwt-interceptor/jwt-interceptor';
import { ItemMsgComponent } from '../components/item-msg/item-msg';
import { Calendar } from '@ionic-native/calendar';

@NgModule({
  declarations: [
    MyApp,
  
  ],
  imports: [
    BrowserModule,
    HomePageModule,
    ListPageModule,
    LoginPageModule,
    MessagePageModule,
    InboxPageModule,
    TrashPageModule,
    EventCalenderPageModule,
    GalleryPageModule,
    ResultPageModule,
    SyllabusPageModule,
    TimetablePageModule,
    HttpClientModule,
    InterceptorModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    MessagePage,
    InboxPage,
    TrashPage,
    EventCalenderPage,
    GalleryPage,
    ResultPage,
    SyllabusPage,
    TimetablePage,
    ItemMsgComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Calendar,
    SecureStorage,
    FCM,
    Device,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserAuthenticationProvider,
    RestProvider,
       
  ]
})
export class AppModule {}
