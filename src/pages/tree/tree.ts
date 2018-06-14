import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from "../../providers/http/http";
import { LoadingProvider } from "../../providers/loading/loading";

/**
 * Generated class for the TreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tree',
  templateUrl: 'tree.html',
})
export class TreePage {
  dataList: any = [];

  constructor(
    private loadingProvider: LoadingProvider,
    private httpProvider: HttpProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TreePage');
    this.getData();
  }
  getData() {
    this.loadingProvider.presentLoadingDefault();
    this.httpProvider.GET("http://www.wanandroid.com/tree/json", "", (res, err) => {
      if (err) {
        console.log(err);
      }
      if (res) {
        console.log(res);
        if (!(res.errorCode < 0)) {
          this.dataList = res.data;
          console.log(this.dataList);
        } else {
          console.log(res.errorMsg);
        }

      }
      this.loadingProvider.dismissLoadingDefault();
    })

  }
  goTreeChildren(title, item) {
    console.log(title);
    console.log(item);
    this.navCtrl.push("ChildrenTreePage", {
      title: title,
      data: item
    })

  }

}
