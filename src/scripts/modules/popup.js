export default class Popup {
  constructor(selector) {
    this.links = document.querySelectorAll(selector);
    this.openedPopup = null;
    this.setListeners();
  }

  open(link) {
    const shouldOpen = this.openedPopup !== document.querySelector(link);

    if (this.openedPopup) {
      this.close(this.openedPopup);
    }
    if (shouldOpen) {
      document.body.classList.add('popup-opened');
      const popup = document.querySelector(link);
      if (!popup) {
        console.error(link, ' не найден!');
        return;
      }
      this.openedPopup = popup;
      popup.classList.add('opening');
      setTimeout(() => {
        popup.classList.remove('opening');
        popup.classList.add('opened');
      }, 50);

      // Клик по классу custom-close, так же закроет попап
      popup.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close') || e.target.classList.contains('custom-close')) {
          this.close(popup);
        }
      });
    }
  }

  close(popup) {
    if (typeof popup === 'string') {
      // eslint-disable-next-line
      popup = document.querySelector(popup);
    }
    popup.classList.add('closing');
    setTimeout(() => {
      popup.classList.remove('closing');
      popup.classList.remove('opened');
      document.body.classList.remove('popup-opened');
    }, 300);
    this.openedPopup = null;
    // eslint-disable-next-line
    popup.removeEventListener('mousedown', close);
  }

  setListeners() {
    if (this.links.length < 1) return;
    // Слушатель на ссылки
    this.links.forEach((link) => {
      link.addEventListener('click', () => {
        this.open(link.getAttribute('data-popup'));
      });
    });
  }
}
