export const initSwiper = function () {

  const swiper = new Swiper('.trainers__swiper', {

    navigation: {
      nextEl: '.trainers__swiper-button--next',
      prevEl: '.trainers__swiper-button--prev',
    },

    // отключение скролла
    simulateTouch: false,

    // Бесконечная прокрутка
    loop: true,

    breakpoints: {
      320: {
        // Количество слайдов на странице
        slidesPerView: 1,
        // порядковый номер первого слайда
        initialSlide: 2,
      },
      768: {
        slidesPerView: 2,
        // Отступ между слайдами
        spaceBetween: 30,
        initialSlide: 2,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 40,
        initialSlide: 0,
      },
    },
  });

  const swiperFeedback = new Swiper('.feedback__swiper', {

    navigation: {
      prevEl: '.feedback__swiper-button--prev',
      nextEl: '.feedback__swiper-button--next',
    },

    loop: false,
    autoHeight: true,
    simulateTouch: false,
    slidesPerView: 1,

  });

  // const imageSlider = document.querySelector('.swiper').swiper;
  // const trainersButtonPrev = document.querySelector('.trainers__swiper-button--prev');
  // const trainersButtonNext = document.querySelector('.trainers__swiper-button--next');
  // const gamesBtn = document.querySelector('.games__btn');
  // const promoButton = document.querySelector('.promo__unlim-link');
  // const swiperSlides = document.querySelectorAll('.trainers__swiper-slide');

  // const firstSlide = imageSlider.slides[0];
  // const lastSlide = imageSlider.slides[7];

  // swiperSlides.forEach(function (swiperSlide) {
  //   swiperSlide.tabIndex = '0';
  // });

  // gamesBtn.addEventListener('keydown', function (evt) {
  //   if (!evt.shiftKey && evt.key === 'Tab') {
  //     evt.preventDefault();
  //     trainersButtonPrev.focus();
  //     console.log('gamesBtn', trainersButtonPrev);
  //   }
  // });


  // trainersButtonPrev.addEventListener('keydown', function (evt) {
  //   if (evt.shiftKey && evt.key === 'Tab') {
  //     evt.preventDefault();
  //     gamesBtn.focus();
  //     console.log('trainersButtonPrev', gamesBtn);
  //   }
  // });


  // trainersButtonNext.addEventListener('keydown', function (evt) {
  //   if (!evt.shiftKey && evt.key === 'Tab') {
  //     evt.preventDefault();
  //     firstSlide.focus();
  //     imageSlider.slideTo(firstSlide.index, 800);
  //     console.log('trainersButtonNext', firstSlide);
  //   }
  // });


  // firstSlide.addEventListener('keydown', function (evt) {
  //   if (evt.shiftKey && evt.key === 'Tab') {
  //     evt.preventDefault();
  //     trainersButtonNext.focus();
  //     console.log('firstSlide', trainersButtonNext);
  //   }
  // });


  // lastSlide.addEventListener('keydown', function (evt) {
  //   if (!evt.shiftKey && evt.key === 'Tab') {
  //     evt.preventDefault();
  //     promoButton.focus();
  //     console.log('lastSlide', promoButton);
  //   }

  //   promoButton.addEventListener('keydown', function (event) {
  //     if (event.shiftKey && event.key === 'Tab') {
  //       event.preventDefault();
  //       lastSlide.focus();
  //       console.log('promoButton', lastSlide);
  //     }
  //   });
  // });

};
