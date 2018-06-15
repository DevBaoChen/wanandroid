import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { HttpProvider } from "../../../providers/http/http";
import { LoadingProvider } from "../../../providers/loading/loading";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the ChildrenProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-children-project',
  templateUrl: 'children-project.html',
})
export class ChildrenProjectPage {
  @ViewChild(Content) content: Content;
  title: string = "";
  id: any;
  dataList: any;
  pageNumber: any = 1;
  backTop: any = false;
  isInfiniteEnabled: boolean = true;
  constructor(
    private loadingProvider: LoadingProvider,
    private httpProvider: HttpProvider,
    public navCtrl: NavController,
    private cd: ChangeDetectorRef,
    private iab: InAppBrowser,
    public navParams: NavParams) {
    this.title = this.navParams.get('item').name;
    this.id = this.navParams.get("item").id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildrenProjectPage');
    this.getData();
    this.content.ionScroll.subscribe(($event: any) => {

      try {
        // console.log($event.scrollTop);//当前滑动的距离
        if ($event.scrollTop > 300) {
          this.backTop = true;
        } else {
          this.backTop = false;
        }
        this.cd.detectChanges();
      } catch (error) {
        console.error(error)
      }
    })
  }
  getData() {
    if(this.pageNumber==1){
      this.loadingProvider.presentLoadingDefault();
    }
    this.httpProvider.GET("http://www.wanandroid.com/project/list/"+this.pageNumber+"/json?cid="+this.id, "", (res, err) => {
      if (err) {
        console.log(err);
      }
      if (res) {
        console.log(res);

        if (!(res.errorCode < 0)) {
          if (this.pageNumber > 1) {
            this.dataList = this.dataList.concat(res.data.datas);
          } else {
            this.dataList = res.data.datas;
          }
          if (res.data.datas.length < 15) {
            this.isInfiniteEnabled = false;
          } else {
            this.isInfiniteEnabled = true;
          }
        } else {
          console.log(res.errorMsg);
        }
      
      }
    })
    this.loadingProvider.dismissLoadingDefault();
  }
  goTop() {
    if (this.backTop) {
      this.content.scrollToTop(500);
    }
  }
    /**
    * 加载下一页
    * @param infiniteScroll 
    */
   doInfinite(infiniteScroll) {
    this.pageNumber = ++this.pageNumber;
    this.getData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 10000);
  }
  showArticleDetail(item) {

    let options: InAppBrowserOptions = {
      location: 'no',
      toolbarposition: 'top',
      closebuttoncaption: '关闭',
      closebuttoncolor: "#ffa017",
      hidenavigationbuttons: "yes",
      // toolbarcolor: '#FFFFFF'
    };
    const browser = this.iab.create(item.link, '_blank', options);
    browser.show();
  }
}
