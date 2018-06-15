import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from "../../providers/http/http";
import { LoadingProvider } from "../../providers/loading/loading";

/**
 * Generated class for the ProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {
  projectDataList: any =[];

  constructor(
    private loadingProvider:LoadingProvider,
    private httpProvider: HttpProvider,
    public navCtrl: NavController,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPage');
    this.getSlideData();
  }
  getSlideData(){
    this.loadingProvider.presentLoadingDefault();
    this.httpProvider.GET("http://www.wanandroid.com/project/tree/json","",(res,err)=>{
      if (err) {
        console.log(err);
      }
      if (res) {
      console.log(res);
      this.projectDataList = res.data;
      }
    })
    this.loadingProvider.dismissLoadingDefault();
  }
  itemSelected(item){
    console.log(item);
    this.navCtrl.push("ChildrenProjectPage",{item:item})
  }

}
