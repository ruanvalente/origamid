import initDebounce from './initDebounce.js';

export default class ScrollSection {
  constructor(sections) {
    this.$sections = document.querySelectorAll(sections);
    this.checkDistance = initDebounce(this.checkDistance.bind(this), 200);
    this.haltOfTheWindow = window.innerHeight * 0.6;
  }

  getDistance() {
    this.distance = [...this.$sections].map(section => {
      const offset = section.offsetTop;
      return {
        element: section,
        offset: Math.floor(offset - this.haltOfTheWindow)
      };
    });
  }

  checkDistance() {
    this.distance.forEach(item => {
      if (window.pageYOffset > item.offset) {
        item.element.classList.add('ativo');
      } else {
        item.element.classList.remove('ativo');
      }
    });
  }

  init() {
    if (this.$sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener('scroll', this.checkDistance);
    }
    return this;
  }
}
