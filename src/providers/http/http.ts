import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {isObject} from "rxjs/util/isObject";
/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HttpProvider Provider');
  }
  GET(url: string, params: any, callback ?: (res: any, error: any) => void): void {

    this.http.get(url, {params: this.encodeComplexHttpParams(params)})
      .subscribe(res => {
        callback && callback(res, null);
      }, error => {
        callback && callback(null, error);
      }
    );
  
  }
  POST(url: string, params: any, callback ?: (res: any, error: any) => void): void {

    this.http.post(url, this.encodeComplexHttpParams(params))
      .subscribe(res => {
        callback && callback(res, null);
      }, error => {
        callback && callback(null, error);
      });
  }

  private encodeComplexHttpParams(params: any): any {
    if (!params) return null;
    return new HttpParams({fromString: this.paramsString(params)});
  }


// 将复杂的参数组装成字符串
private paramsString(params: any): string {

  if (!params) return null;

  let str = "";

  for (let key in params) {
    if (params.hasOwnProperty(key)) {
    let value = params[key];
    if (value === null) continue;

    if (Array.isArray(value)) {
      if (value.length === 0) continue;

      for (let index = 0; index < value.length; index++) {
        let k = key + "[" + index + "]";
        let v = value[index];
        if (str.length > 1) str += "&";
        str += k + "=" + v;
      }
    } else if (isObject(value)) {

      for (let subKey in value) {
        if (value.hasOwnProperty(subKey)) {
          let v = value[subKey];
          if (v === null) continue;

          let k = key + "[" + subKey + "]";
          if (str.length > 1) str += "&";
          str += k + "=" + v;
        }
      }

      } else {
        if (str.length > 1) str += "&";
        str += key + "=" + value;
      }
    }
  }
  return str;
}

}
