import Notification from 'rc-notification';
import React from 'react';
import 'rc-notification/assets/index.css';
// import './notifiction.scss';

let notification = null;
Notification.newInstance({}, (n) => notification = n);

export function note(msg) {
  notification.notice({
    content: <span>{msg}</span>,
    onClose() {
      console.log('simple close');
    },
  });
}

export function noteClosable(msg) {
  notification.notice({
    content: <span>{msg}</span>,
    // duration: 3,
    onClose() {
      console.log('closable close');
    },
    closable: true,
  });
}

// function close(key) {
//   notification.removeNotice(key);
// }
