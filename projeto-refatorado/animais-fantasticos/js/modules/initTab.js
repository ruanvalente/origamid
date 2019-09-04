export default class Tab {
  constructor(menu, context) {
    this.$tabMenu = document.querySelectorAll(menu);
    this.$tabContent = document.querySelectorAll(context);
    this.activeClass = 'ativo';
  }

  activeTab(index) {
    this.$tabContent.forEach(element =>
      element.classList.remove(this.activeClass)
    );
    const direction = this.$tabContent[index].dataset.anime;
    this.$tabContent[index].classList.add(this.activeClass, direction);
  }

  addTabNavEvent() {
    this.$tabMenu.forEach((itemMenu, index) => {
      itemMenu.addEventListener('click', () => {
        this.activeTab(index);
      });
    });
  }

  init() {
    if (this.$tabMenu.length && this.$tabContent.length) {
      this.activeTab(0);
      this.addTabNavEvent();
    }
  }
}
