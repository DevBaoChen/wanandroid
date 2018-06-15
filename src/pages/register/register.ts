import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from "../../providers/http/http";
import { LoadingProvider } from "../../providers/loading/loading";
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  username:any="";
  password:any ="";
  repassword:any ="";
  constructor(
    private loadingProvider: LoadingProvider,
    private httpProvider: HttpProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  
  register(){
    var params = {
      username : this.username,
      password : this.password,
      repassword: this.repassword
    }
    this.loadingProvider.presentLoadingDefault();
    this.httpProvider.POST("http://www.wanandroid.com/user/register",params,(res,err)=>{
      if (err) {
        console.log(err);
      }
      if (res) {
        console.log(res);
        if (!(res.errorCode < 0)) {
          this.navCtrl.pop();
        }else{
          console.log(res.errorMsg);
        }
      }
    })
    this.loadingProvider.dismissLoadingDefault();


  }
}
