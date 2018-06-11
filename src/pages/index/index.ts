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
    // 
    this.httpProvider.GET("http://www.wanandroid.com/article/list/0/json", "", (res, err) => {
      if (err) {
        console.log(err);
      }
      if (res) {
        console.log(res);
      }
    })
  }

}
