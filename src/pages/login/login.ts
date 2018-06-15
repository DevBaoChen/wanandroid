import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from "../../providers/http/http";
import { LoadingProvider } from "../../providers/loading/loading";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
   isShowPassword: boolean = false;
   username:any="";
   password:any ="";
  constructor(
    private loadingProvider: LoadingProvider,
    private httpProvider: HttpProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  showPassword($event) {
    $event.preventDefault();
    this.isShowPassword = !this.isShowPassword;
  }
  login(){
    console.log(this.username);
    console.log(this.password);
    var params = {
      username : this.username,
      password : this.password
    }
    this.loadingProvider.presentLoadingDefault();
    this.httpProvider.POST("http://www.wanandroid.com/user/login",params,(res,err)=>{
      if (err) {
        console.log(err);
      }
      if (res) {
        console.log(res);
        if (!(res.errorCode < 0)) {
          window.localStorage.setItem("username",res.data.username);
          window.localStorage.setItem("password",res.data.password);
          this.navCtrl.pop();

        }else{
          console.log(res.errorMsg);
        }
      }
    })
    this.loadingProvider.dismissLoadingDefault();
  }

}
