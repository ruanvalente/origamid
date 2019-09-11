export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.distances = {
      finalPosition: 0,
      startPosition: 0,
      movementPosition: 0
    };
  }

  movieSlide(distX) {
    this.distances.moviePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePostion(clientX) {
    this.distances.movementPosition =
      (this.distances.startPosition - clientX) * 1.6;
    return this.distances.finalPosition - this.distances.movementPosition;
  }

  onStart(e) {
    e.preventDefault();
    this.distances.startPosition = e.clientX;
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(e) {
    const finalPosition = this.updatePostion(e.clientX);
    this.movieSlide(finalPosition);
  }

  onEnd(e) {
    this.wrapper.removeEventListener('mousedown', this.onMove);
    this.distances.finalPosition = this.distances.moviePosition;
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
  }
}
