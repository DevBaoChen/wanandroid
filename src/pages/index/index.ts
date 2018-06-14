import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { HttpProvider } from "../../providers/http/http";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var Swiper;
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
  bannerList: any = [];
  swiper: any;
  constructor(
    private cd: ChangeDetectorRef,
    private httpProvider: HttpProvider,
    public navCtrl: NavController,
    private iab: InAppBrowser,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    this.getBannerData();
    this.swiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      speed: 300,
      observer: true,
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
      }
    });
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
  ionViewDidEnter() {  //每次都会重新刷新数据
    //自动播放
    this.swiper.autoplay.start();
  }
  ionViewDidLeave() {
    //页面离开时停止自动播放
    this.swiper.autoplay.stop();
  }
  /**
 * 获取轮播图 数据
 */
  getBannerData() {
    this.httpProvider.GET("http://www.wanandroid.com/banner/json", "", (res, err) => {
      if (err) {
        console.log(err);
      }
      if (res) {
        console.log(res);
        if (!(res.errorCode < 0)) {
          this.bannerList = res.data;
          console.log(this.bannerList);
        } else {
          console.log(res.errorMsg);
        }
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
}
