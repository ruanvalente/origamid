export default class Scroll {
  constructor(links, options) {
    this.links = document.querySelectorAll(links);
    if (options === undefined) {
      this.options = {
        inline: 'start',
        behavior: 'smooth'
      };
    } else {
      this.options = options;
    }

    this.activeScroll = this.activeScroll.bind(this);
  }

  activeScroll(e) {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    const toSection = document.querySelector(href);
    toSection.scrollIntoView(this.options);
  }

  addLinkEvent() {
    this.links.forEach(link =>
      link.addEventListener('click', this.activeScroll)
    );
  }

  init() {
    if (this.links.length) {
      this.addLinkEvent();
    }
    return this;
  }
}
