import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from "../../providers/http/http";

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
  dataList:any=[];

  constructor(
    private httpProvider: HttpProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    this.getData();
  }
  getData() {
    this.httpProvider.GET("http://www.wanandroid.com/article/list/0/json", "", (res, err) => {
      if (err) {
        console.log(err);
      }
      if (res) {
        for(var i=0;i< res.data.datas.length;i++){
          res.data.datas[i].title =res.data.datas[i].title.replace("&mdash;","-").replace("&mdash;","-").replace("&ndash;","-").replace("&ldquo;","“").replace("&rdquo;","”")
        }
        this.dataList = res.data.datas;
      }
    })
  }

}
