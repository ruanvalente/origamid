export default class ScrollSection {
  constructor(sections) {
    this.$sections = document.querySelectorAll(sections);
    this.activeSectionScroll = this.activeSectionScroll.bind(this);
  }

  activeSectionScroll() {
    this.$sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const haltOfTheWindow = (sectionTop - window.innerHeight) * 0.6;
      if (haltOfTheWindow < 0) {
        section.classList.add('ativo');
      }
    });
  }

  init() {
    if (this.$sections.length) {
      this.activeSectionScroll();
      window.addEventListener('scroll', this.activeSectionScroll);
    }
  }
}
