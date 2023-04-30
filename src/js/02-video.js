import throttle from 'lodash.throttle';
import Vimeo from '@vimeo/player';
import { load, save } from './storage';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const key = 'videoplayer-current-time';

const saveTimeLocalStorage = throttle(function (value) {
  save(key, value);
}, 1000);

player.on('timeupdate', function (data) {
  const currentTime = data.seconds;
  saveTimeLocalStorage(currentTime);
});

const savedTime = load(key);

player
  .setCurrentTime(savedTime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
