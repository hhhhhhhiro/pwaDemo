import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

import { environment } from '../environments/environment';
import { PushNotificationService } from './push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  env = environment.API_URL;
  readonly VAPID_PUBLIC_KEY =
    'BCQwgwQOga2K5ZiRqCMF_L8_kNpUITGpbsnktQiPfPtmdIyhrfY_oy8dqiEZkk2ce6zy82jrKFejJ3Tn9_HvQMY';
  constructor(
    private swPush: SwPush,
    private pushService: PushNotificationService,
    private swUpdate: SwUpdate
  ) {}

  ngOnInit() {
    // available
    this.swUpdate.available.subscribe(event => {
      this.swUpdate.activateUpdate().then(() => {
        if (confirm('New version available. Update to New Version?')) {
          document.location.reload();
        }
      });
    });

    interval(50000).subscribe(() => {
      this.swUpdate.checkForUpdate().then(() => {
        alert('checkForUpdate');
      });
    });
  }

  subscribeToNotifications() {
    if (this.swPush.isEnabled) {
      this.swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY
        }) // return push subscription object
        .then(subscription => {
          // send subscription to the server
          console.log('subscription', subscription);
          this.pushService
            .sendSubscriptionToTheServer(subscription)
            .subscribe(res => console.log('subscription-response', res));
        })
        .catch(console.error);
    }
  }
}

function displayNotification() {
  navigator.serviceWorker.getRegistration().then(function(reg) {
    const options = {
      body:
        'BJです！本日は、獲得コインが2倍になるイベントをブラックジャックで開催中です！!',
      icon: 'assets/icons/coin.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        { action: 'explore', title: 'Open now' },
        { action: 'close', title: 'Close' }
      ]
    };
    reg.showNotification('', options);
  });
}
