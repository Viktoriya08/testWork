/*
Документация: https://github.com/RobinHerbots/Inputmask
*/

import Inputmask from 'inputmask';

export default function initInputMask() {
  const phoneMask = new Inputmask('+7 (999) 999-99-99');

  const emailMask = new Inputmask({
    mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]',
    greedy: false,
    onBeforePaste(pastedValue) {
      return pastedValue.toLowerCase().replace('mailto:', '');
    },
    definitions: {
      '*': {
        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~]",
        casing: 'lower',
      },
    },
  });

  phoneMask.mask(document.querySelectorAll('input[type="tel"]'));
  emailMask.mask(document.querySelectorAll('input[data-email]'));
}

