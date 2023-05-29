import { iosVhFix } from './utils/ios-vh-fix';
// import { initModals } from './modules/modals/init-modals';
import { initVideo } from './modules/video';
import { initTabs } from './modules/tabs';
import { initSwiper } from './modules/swiper';
import { initMask } from './modules/mask-tel';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------
  initVideo();
  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    // initModals();

    initTabs();
    initSwiper();
    initMask();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
// <div class="www" id="parent2">
//   <div class="ggg" id="parent1">
//     <p class="zzz" id="child"></p>
//   </div>
// </div>
// let elem = document.querySelector('#child');
// let parent = elem.closest('.www');
// console.log(parent.id);
// Результат: 'parent2'
