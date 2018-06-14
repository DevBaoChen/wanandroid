import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {

  private loading;

  constructor(
      public loadingCtrl: LoadingController,
      private alertCtrl: AlertController) { }

  presentLoadingDefault() {
      if (!this.loading) {
          this.loading = this.loadingCtrl.create({
              content: '加载中...'
          });
          this.loading.present();
      }
  }
  presentLoadingMsg(msg) {
      if (!this.loading) {
          this.loading = this.loadingCtrl.create({
              content: msg
          });
          this.loading.present();
      }
  }

  dismissLoadingDefault() {
      if (this.loading) {
          this.loading.dismiss();
          this.loading = null;
      }
  }

  presentProgress(present) {
      if (present == 100) {
          this.loading.dismiss();
          this.loading = null;
          return;
      }
      if (!this.loading) {
          this.loading = this.loadingCtrl.create({
              content: '已下载：' + present + '%'
          });
          this.loading.present();
      }

      this.loading.data.content = '已下载：' + present + '%';
  }

  presentMsg(msg) {
      let alert = this.alertCtrl.create({
          subTitle: msg,
      });
      alert.present();

      setTimeout(() => {
          alert.dismiss();
      }, 3000);
  }

  presentTip(title, msg) {
      var alert = this.alertCtrl.create({
          title: title,
          subTitle: msg,
          buttons: [{
              text: '确定',
              role: 'cancel',
              handler: () => {
              }
          }]
      });
      alert.present();
  }

  presentLoadingCustom() {
      let loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: `
              <div class="custom-spinner-container">
              <div class="custom-spinner-box"></div>
              </div>`,
          duration: 5000
      });

      loading.onDidDismiss(() => {
          console.log('Dismissed loading');
      });

      loading.present();
  }

  presentLoadingText() {
      let loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: '加载中...'
      });

      loading.present();

      setTimeout(() => {
      }, 1000);

      setTimeout(() => {
          loading.dismiss();
      }, 5000);
  }

}
