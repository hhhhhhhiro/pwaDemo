const express = require('express');
const webpush = require('web-push');
const cors = require('cors');
const bodyParser = require('body-parser');

const PUBLIC_VAPID = 'BMyELK0fG_JYHdXuVxOGIbS3ul_G6hrRFX5v8qFJcX3vbp3OpSC-2Ek-jDvFZ3dUhFSNrKDB_X00R88vuJNaI0c';
const PRIVATE_VAPID = 'QXDNKtinUbFLvZYzbycYouEP6VbGBD3CkkBi7cEZDe0';

const fakeDatabase = [];

const app = express();

app.use(cors());
app.use(bodyParser.json());

webpush.setVapidDetails('mailto:you@domain.com', PUBLIC_VAPID, PRIVATE_VAPID);

app.post('/subscription', (req, res) => {
  const subscription = req.body;
  fakeDatabase.push(subscription);
});

app.post('/sendNotification', (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is the body of the notification',
      icon: 'assets/icons/icon-512x512.png'
    }
  };

  const promises = [];
  fakeDatabase.forEach(subscription => {
    promises.push(webpush.sendNotification(subscription, JSON.stringify(notificationPayload)));
  });
  Promise.all(promises).then(() => res.sendStatus(200));
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
