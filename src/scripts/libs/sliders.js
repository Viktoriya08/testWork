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
import Swiper, { Navigation, Pagination, Autoplay, EffectFade, Thumbs} from 'swiper';

// Инициализация слайдеров
export default function initSliders() {
  // Перечень слайдеров
  const bannerSlider = document.querySelector('.mb-slider-js');

  if (bannerSlider) {
    const mainSwiper = new Swiper(bannerSlider, {
      modules: [Navigation, Pagination, Autoplay, Thumbs, EffectFade],
      spaceBetween: 0,
      slidesPerView: 1,
      watchSlidesProgress: true,
      effect: 'fade',
      loop: true,
      // fadeEffect: {
      // 	crossFade: true,
      // },
      navigation: {
        nextEl: bannerSlider.querySelector('.main-banner__button--next'),
        prevEl: bannerSlider.querySelector('.main-banner__button--prev'),
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      on:
				{

				  click: function changeSlide(params) {
				    if (window.matchMedia('(max-width: 992px)').matches) return;

				    bannerSlider.addEventListener('click', defineClick);
				    // bannerSlider.removeEventListener('click', defineClick);
				  },
				},
    });
  }

  // Слайдер страница Новости
  const BigSlider = document.querySelector('.big-slider-js');

  if (BigSlider) {
    const bigSwiper = new Swiper(BigSlider, {
      modules: [Navigation, Pagination, Autoplay, Thumbs, EffectFade],
      spaceBetween: 0,
      slidesPerView: 1,
      watchSlidesProgress: true,
      effect: 'fade',
      loop: true,
      // fadeEffect: {
      // 	crossFade: true,
      // },
      navigation: {
        nextEl: BigSlider.querySelector('.main-banner__button--next'),
        prevEl: BigSlider.querySelector('.main-banner__button--prev'),
      },
      // autoplay: {
      //   delay: 4000,
      //   disableOnInteraction: false,
      // },
      on:
				{

				  click: function changeSlide(params) {
				    if (window.matchMedia('(max-width: 992px)').matches) return;

				    BigSlider.addEventListener('click', defineClick);
				  },
				},
    });
  }

  // функция перелистывания слайдера - клик мыши слева или справа
  function defineClick(event) {
    event.stopPropagation();
    const halfScreenWidth = document.documentElement.clientWidth / 2;

    // Если мышь находится в правой половине экрана
    if (event.clientX >= halfScreenWidth) {
      this.swiper.slideNext();
      // eslint-disable-next-line brace-style
    }
    // Если мышь находится в левой половине экрана
    else {
      this.swiper.slidePrev();
    }
  }

  const shortSliders = document.querySelectorAll('.short-slider-js');
  if (shortSliders.length) {
    shortSliders.forEach((slider) => {
      const shortSliderSwiper = new Swiper(slider.querySelector('.swiper'), {
        modules: [Navigation],
        spaceBetween: 0,
        slidesPerView: 1.2,
        navigation: {
          nextEl: slider.querySelector('.short__btn--next'),
          prevEl: slider.querySelector('.short__btn--prev'),
        },
        breakpoints: {
          650: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          960: {
            slidesPerView: 2.3,
          },
          1360: {
            slidesPerView: 3.1,
            spaceBetween: 0,
          },
          1850: {
            slidesPerView: 4,
          },
          1940: {
            slidesPerView: 5,
          },
        },
      });
    });
  }

  // удалить слайдер после 767px

  const breakpoint = window.matchMedia('(min-width:992px)');

  // eslint-disable-next-line camelcase
  let mobileSliderSwiper;

  // eslint-disable-next-line func-names
  const breakpointChecker = function () {
    if (breakpoint.matches === true) {
      if (mobileSliderSwiper !== undefined) mobileSliderSwiper.destroy(true, true);
      // eslint-disable-next-line no-useless-return
      return;
      // eslint-disable-next-line no-else-return
    } else if (breakpoint.matches === false) {
      return enableSwiper();
    }
  };

  // eslint-disable-next-line func-names
  const enableSwiper = function () {
    const mobileSliders = document.querySelectorAll('.slider-mobile');
    if (mobileSliders.length) {
      mobileSliders.forEach((slider) => {
        mobileSliderSwiper = new Swiper(slider.querySelector('.swiper'), {
          modules: [Navigation, Pagination],
          spaceBetween: 0,
          slidesPerView: 1.2,
          breakpoints: {
            768: {
              slidesPerView: 2.7,
              spaceBetween: 20,
            },
            960: {
              slidesPerView: 2.3,
            },
            992: {
              slidesPerView: 3.1,
              spaceBetween: 0,
            },
          },
          pagination: {
            el: slider.querySelector('.swiper-pagination'),
            type: 'progressbar',
          },
        });
      });
    }
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();

  //  /  удалить слайдер после 767px

  const defaultSliders = document.querySelectorAll('.default-slider');
  if (defaultSliders.length) {
    defaultSliders.forEach((slider) => {
      const defaultSliderSwiper = new Swiper(slider.querySelector('.default-slider-js'), {
        modules: [Navigation, Pagination, Autoplay],
        spaceBetween: 20,
        slidesPerView: 1,
        initialSlide: 0,
        // autoplay: {
        //   delay: 4000,
        //   disableOnInteraction: false,
        // },
        breakpoints: {
          450: {
            slidesPerView: 1.1,
          },
          700: {
            slidesPerView: 2.1,
          },
          1200: {
            slidesPerView: 4.1,
          },
        },
        pagination: {
          el: slider.querySelector('.swiper-pagination'),
          type: 'progressbar',
        },
      });
    });
  }

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

  const sectionSliders = document.querySelectorAll('.section-slider');
  if (sectionSliders) {
    sectionSliders.forEach((slider) => {
      const sectionSliderSwiper = new Swiper(slider, {
        modules: [Navigation, Pagination, Autoplay],
        spaceBetween: 20,
        slidesPerView: 1,
        initialSlide: 0,
        // autoplay: {
        // 	delay: 4000,
        // 	disableOnInteraction: false,
        // },
        navigation: {
          nextEl: slider.querySelector('.section-slider__btn--next'),
          prevEl: slider.querySelector('.section-slider__btn--prev'),
        },
      });
    });
  }

  const personalSliders = document.querySelectorAll('.personal-slider-js');
  if (personalSliders) {
    personalSliders.forEach((slider) => {
      const personalSliderSwiper = new Swiper(slider, {
        modules: [Navigation, Pagination, Autoplay],
        spaceBetween: 0,
        slidesPerView: 2,
        // autoplay: {
        // 	delay: 4000,
        // 	disableOnInteraction: false,
        // },
        navigation: {
          nextEl: slider.querySelector('.personal-slider__btn--next'),
          prevEl: slider.querySelector('.personal-slider__btn--prev'),
        },
      });
    });
  }
}
