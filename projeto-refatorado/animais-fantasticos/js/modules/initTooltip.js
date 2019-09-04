export default class Tooltip {
  constructor(tooltips) {
    this.$tooltips = document.querySelectorAll(tooltips);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  onMouseOver(e) {
    this.createTooltipBox(e.currentTarget);
    e.currentTarget.addEventListener('mouseleave', this.onMouseLeave);
    e.currentTarget.addEventListener('mousemove', this.onMouseMove);
  }

  onMouseLeave(e) {
    this.tooltipBox.remove();
    e.currentTarget.removeEventListener('mouseleave', this.onMouseLeave);
    e.currentTarget.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove(e) {
    this.tooltipBox.style.top = `${e.pageY + 20}px`;
    if (e.pageX + 240 > window.innerWidth) {
      this.tooltipBox.style.left = `${e.pageX - 100}`;
    } else {
      this.tooltipBox.style.left = `${e.pageX + 20}px`;
    }
  }

  createTooltipBox(element) {
    const tooltipBox = document.createElement('div');
    const textTooltipBox = element.getAttribute('aria-label');
    tooltipBox.classList.add('tooltip');
    tooltipBox.innerText = textTooltipBox;
    document.body.appendChild(tooltipBox);
    this.tooltipBox = tooltipBox;
  }

  addTooltipsEvent() {
    this.$tooltips.forEach(item =>
      item.addEventListener('mouseover', this.onMouseOver)
    );
  }

  init() {
    if (this.$tooltips.length) {
      this.addTooltipsEvent();
    }
    return this;
  }
}
