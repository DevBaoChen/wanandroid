import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { HttpProvider } from "../../../providers/http/http";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { LoadingProvider } from "../../../providers/loading/loading";

/**
 * Generated class for the ChildrenTreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-children-tree',
  templateUrl: 'children-tree.html',
})
export class ChildrenTreePage {
  @ViewChild(Content) content: Content;
  dataList: any = [];
  backTop: any = false;
  pageNumber: any = 0;
  isInfiniteEnabled: boolean = true;
  title: any = "";
  data: any;
  treeId:any;

  slideCss: number = 0;
  constructor(private cd: ChangeDetectorRef,
    private httpProvider: HttpProvider,
    private loadingProvider: LoadingProvider,
    public navCtrl: NavController,
    private iab: InAppBrowser,
    public navParams: NavParams) {
    this.title = this.navParams.get("title");
    this.data = this.navParams.get("data");
    console.log(this.data);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChildrenTreePage');
    this.slideCss = this.data[0].id;
    this.treeId = this.data[0].id;
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
  goTop() {
    if (this.backTop) {
      this.content.scrollToTop(500);
    }
  }
  getData() {
    if(this.pageNumber ==0){
      this.loadingProvider.presentLoadingDefault();
    }
    this.httpProvider.GET("http://www.wanandroid.com/article/list/" + this.pageNumber + "/json?cid="+ this.treeId, "", (res, err) => {
      if (err) {
        console.log(err);
      }
      if (res) {
        console.log(res);
        if (!(res.errorCode < 0)) {
          for (var i = 0; i < res.data.datas.length; i++) {
            res.data.datas[i].title = res.data.datas[i].title.replace("&mdash;", "-").replace("&mdash;", "-").replace("&ndash;", "-").replace("&ldquo;", "“").replace("&rdquo;", "”")
          }
          if (this.pageNumber > 0) {
            this.dataList = this.dataList.concat(res.data.datas);
          } else {
            this.dataList = res.data.datas;
          }
          if (res.data.datas.length < 10) {
            this.isInfiniteEnabled = false;
          } else {
            this.isInfiniteEnabled = true;
          }
        } else {
          console.log(res.errorMsg);
        }
      }
      this.loadingProvider.dismissLoadingDefault();
    })
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
  showArticleDetail(dataListItem) {
    let options: InAppBrowserOptions = {
      location: 'no',
      toolbarposition: 'top',
      closebuttoncaption: '关闭',
      closebuttoncolor: "#ffa017",
      hidenavigationbuttons: "yes",
      // toolbarcolor: '#FFFFFF'
    };
    const browser = this.iab.create(dataListItem.link, '_blank', options);
    browser.show();
  }
  onSlideClick(slide) {
    this.pageNumber = 0;
    this.slideCss = slide.id;
    this.treeId = slide.id;
    this.getData();
  }
}
