/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable object-curly-spacing */
/* eslint-disable object-curly-newline */
/*
Документация по работе в шаблоне:
Документация слайдера: https://swiperjs.com/swiper-api
Сниппет (PUG): swiper

Подключаем слайдер Swiper из node_modules
При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
Пример: { Navigation, Autoplay }

Подробнее смотри https://swiperjs.com/swiper-api#modules
*/
import Swiper, {} from 'swiper';

// Инициализация слайдеров
export default function initSliders() {
  // Перечень слайдеров

  const trendsSliders = document.querySelectorAll('.trends-slider');
  if (trendsSliders.length) {
    trendsSliders.forEach((slider) => {
      const trendsSliderSwiper = new Swiper(slider, {
        spaceBetween: 8,

        breakpoints: {
          0: {
            slidesPerView: 1.2,
            spaceBetween: 8,
          },
          550: {
            slidesPerView: 2.2,
          },
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4.2,
            spaceBetween: 32,
          },
        },
      });
    });
  }
}
