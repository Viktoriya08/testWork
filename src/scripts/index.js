/* eslint-disable import/no-duplicates */
// LIBS
import initSliders from '@scripts/libs/sliders.js';
import initInputMask from '@scripts/libs/input-mask';


// MODULES
import Popup from '@scripts/modules/popup';
import addFavorits from '@scripts/modules/addFavorits';


// webpAvifSupportChecker();

document.addEventListener('DOMContentLoaded', () => {
  if (window.host !== 'archangel-michael.localhost') {
    window.initUI();
  }
});

// eslint-disable-next-line func-names
window.initUI = function () {
  initSliders();
  addFavorits();
  window.popup = new Popup('[data-popup]');
  initInputMask();
};
