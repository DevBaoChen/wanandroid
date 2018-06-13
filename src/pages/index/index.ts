import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
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
  @ViewChild(Content) content: Content;
  dataList: any = [];
  backTop: any = false;
  pageNumber: any = 0;
  isInfiniteEnabled: boolean = true;
  constructor(
    private cd: ChangeDetectorRef,
    private httpProvider: HttpProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
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
    this.httpProvider.GET("http://www.wanandroid.com/article/list/" + this.pageNumber + "/json", "", (res, err) => {
      if (err) {
        console.log(err);
      }
      if (res) {
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

      }
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


}
