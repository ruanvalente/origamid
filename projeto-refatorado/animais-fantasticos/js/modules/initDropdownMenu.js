import outSideClick from './initOutside.js';

export default class DropdownMenu {
  constructor(dropdonMenus, events) {
    this.$dropdownMenus = document.querySelectorAll(dropdonMenus);
    this.events = [...events];
    this.handleDropdownMenu = this.handleDropdownMenu.bind(this);
  }

  addDropdownMenuEvents() {
    this.$dropdownMenus.forEach(menu => {
      this.events.forEach(userEvent => {
        menu.addEventListener(userEvent, this.handleDropdownMenu);
      });
    });
  }

  handleDropdownMenu(e) {
    const $element = e.currentTarget;

    e.preventDefault();
    $element.classList.add('active');
    outSideClick($element, this.events, () => {
      $element.classList.remove('active');
    });
  }

  init() {
    this.addDropdownMenuEvents();
  }
}
