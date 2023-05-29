export const initVideo = function () {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  let player = document.querySelector('.hall__video-player');
  let link = document.querySelector('.hall__video-button');
  let boxVideo = document.querySelector('.hall__video');

  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    boxVideo.classList.add('is-show');
    new YT.Player(player, {
      // height: '285',
      // width: '544',
      videoId: '9TZXsZItgdw',
      events: {
        onReady: (e) => e.target.playVideo(),
      },
    });
    // evt.stopPropagation();
  });

};

