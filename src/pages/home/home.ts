import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController , ActionSheetController} from 'ionic-angular';
import { END_POINTS } from '../../app.config'; 
import { RestProvider } from '../../providers/rest/rest';


import * as HighCharts from 'highcharts';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


   base_url:string = END_POINTS.baseUrl;
   notification:number=0;
   currentstudent:any;
   buttons = [];
   present=0;
   absent = 0;
   holiday = 0;
  constructor(public navCtrl: NavController , public actionSheet: ActionSheetController,public rest:RestProvider ) {
   
     this.loadCurrentStudent(); 
      //this.currentstudent = JSON.parse(localStorage.getItem('currentStudent'));
      
  }

   ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
     //this.loadChart();
    
  }

 ionViewWillEnter(){

 	this.loadCurrentStudent(); 

 }

 loadCurrentStudent(){

     this.currentstudent = JSON.parse(localStorage.getItem('currentStudent'));
     
     //console.log(this.currentstudent.std_name);
  }


  showMore(){
     let students =  JSON.parse(localStorage.getItem('students'));
      // console.log(this.currentstudent.std_name);

     let thisObj = this;
      let actionSheet = this.actionSheet.create({
      title: 'Select Your Child',
          });
      students.forEach(function(item,value){
         
        

         actionSheet.addButton({text:item.std_name, handler: ()=> {

         	
           localStorage.setItem('currentStudent',JSON.stringify(item));
           thisObj.navCtrl.setRoot(thisObj.navCtrl.getActive().component);
         }

        })


      });
     
    actionSheet.present();
  


  }
  ngAfterViewInit() {
    console.log("afterinit");
    setTimeout(() => {
    
      this.LoadHighChart()
    }, 1000);
  }
   
  

  
  LoadHighChart(){
         

    var options = {
        
                                colors: ['#058DC7', '#50B432', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
                                title: {
                                        text:"RESULT",
                                        style: {
                                            color: '#FFF',
                                            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
                                        }
                                    },
                                    subtitle: {
                                        style: {
                                            color: 'gray',
                                            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
                                        }
                                    },

                                    legend: {
                                         layout: 'horizontal',
                                        floating: false,
                                        align: 'left',
                                        verticalAlign: 'bottom',
                                        padding: 14,
                                        x: 0,
                                        y: 20,
                                        itemStyle: {
                                            font: 'Robot ,sans-serif',
                                            color: 'white'
                                        },
                                        itemHoverStyle:{
                                            color: 'white'
                                        } 
                                    },
                                
                                labels: {
                                    
                                    items: [{
                                    html: undefined,
                                    style: {
                                    color: '#FFF'
                                      }
                                    }],
                                    style: {
                                    color: '#3E576F'
                                      }
                                    },
                                chart: {
                                         alignTicks: true,
          animation: true,
          backgroundColor: "rgba(210, 23, 92, 0)",
                                        borderColor: "#4572A7"
                                    },
            xAxis: {
                                         labels:{
                                             style:{
                                                  color: '#FFF'  
                                             }
                                             
                                         },
                  categories:[]//['Test1', 'Test2', 'Test3','Test4']
            },
                                       yAxis: {
                                         labels:{
                                             style:{
                                                  color: '#FFF'  
                                             }
                                             
                                         },
                title:{
                                            text:"Marks",
                                            style:{
                                                color:"#FFF",
                                            }
                                        }
            },
 
           series:  [],
                    credits: {
                                        enabled: false,
                                       }
                                
        };     

       // HighCharts.setOptions(options);
    //Highchart    
   
    this.rest.getGraphData(this.currentstudent.id,this.currentstudent.std_class_id).subscribe(data=>{
          
         this.present =data['present'];
         this.absent = data['absent'];
 
         console.log(data);
               for(var i=0; i<data['categories'].length;i++){

                      options.xAxis.categories[i] = data['categories'][i];
                  }

               for(var i=0; i<data['series'].length;i++){
               // $scope.totalmarks = Number($scope.totalmarks) + Number(10);
                options.series[i] = data['series'][i];
                var  series = data['series'][i];
                 
                }
       var myChart = HighCharts.chart('container',options);
       
    })  
   

    

  }

}
