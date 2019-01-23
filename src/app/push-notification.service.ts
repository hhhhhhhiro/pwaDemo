import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

const SERVER_URL = 'https://z38t76e9nj.execute-api.ap-northeast-1.amazonaws.com/prod/webpush';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private http: HttpClient) { }

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    const body = {
      action: 'subscribe',
      subscription: subscription
    };
    console.log('post', body);
    return this.http.post(SERVER_URL, body);
    // post发送
  }
}
