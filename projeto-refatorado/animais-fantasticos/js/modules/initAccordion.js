export default class InitAccordion {
  constructor(list) {
    this.$accordionList = document.querySelectorAll(list);
    this.activeClasse = 'ativo';
  }

  toggleAccordion(item) {
    item.classList.toggle(this.activeClasse);
    item.nextElementSibling.classList.toggle(this.activeClasse);
  }

  addAccordionEvent() {
    this.$accordionList.forEach(item =>
      item.addEventListener('click', () => this.toggleAccordion(item))
    );
  }

  init() {
    if (this.$accordionList.length) {
      this.toggleAccordion(this.$accordionList[0]);
      this.addAccordionEvent();
    }
  }
}
