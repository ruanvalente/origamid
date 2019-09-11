import outSideClick from './initOutside.js';

export default class MenuMobile {
  constructor(buttonMenu, listMenu, events) {
    this.$buttonMenu = document.querySelector(buttonMenu);
    this.$listMenu = document.querySelector(listMenu);
    this.events = [...events];
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
  }

  handleOpenMenu() {
    this.$buttonMenu.classList.add('active');
    this.$listMenu.classList.add('active');

    outSideClick(this.$listMenu, this.events, () => {
      this.$buttonMenu.classList.remove('active');
      this.$listMenu.classList.remove('active');
    });
  }

  addButtonMenuEvents() {
    this.events.forEach(userEvents =>
      this.$buttonMenu.addEventListener(userEvents, this.handleOpenMenu)
    );
  }

  init() {
    if (this.$buttonMenu && this.$listMenu) {
      this.addButtonMenuEvents();
    }
    return this;
  }
}
