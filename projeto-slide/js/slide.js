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

  transition(active) {
    this.slide.style.transition = active ? 'transform .3s' : '';
  }

  moveSlide(distX) {
    this.distances.moviePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePostion(clientX) {
    this.distances.movementPosition =
      (this.distances.startPosition - clientX) * 1.6;
    return this.distances.finalPosition - this.distances.movementPosition;
  }

  onStart(e) {
    let moveType;

    if (e.type === 'mousedown') {
      e.preventDefault();
      this.distances.startPosition = e.clientX;
      moveType = 'mousemove';
    } else {
      this.distances.startPosition = e.changedTouches[0].clientX;
      moveType = 'touchmove';
    }
    this.wrapper.addEventListener(moveType, this.onMove);
    this.transition(false);
  }

  onMove(e) {
    const pointerPosition =
      e.type === 'mousemove' ? e.clientX : e.changedTouches[0].clientX;
    const finalPosition = this.updatePostion(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(e) {
    const removeTypeMove = e.type === 'mouseup' ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(removeTypeMove, this.onMove);
    this.distances.finalPosition = this.distances.moviePosition;
    this.transition(true);
    this.changeSlideOnEnd();
  }

  changeSlideOnEnd() {
    if (
      this.distances.movementPosition > 120 &&
      this.index.active !== undefined
    ) {
      this.activeNextSlide();
    } else if (
      this.distances.movementPosition < 120 &&
      this.index.prev !== undefined
    ) {
      this.activeNextSlide();
    } else {
      this.changeSlide(this.index.active);
    }
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slideConfing() {
    this.slideToArray = [...this.slide.children].map(element => {
      const position = this.slidePosition(element);
      return {
        position,
        element
      };
    });
  }

  slideIndexNav(index) {
    const last = this.slideToArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideToArray[index];
    this.moveSlide(activeSlide.position);
    this.slideIndexNav(index);
    this.distances.finalPosition = activeSlide.position;
  }

  activePrevSlide() {
    if (this.index.prev !== undefined) {
      this.changeSlide(this.index.prev);
    }
  }

  activeNextSlide() {
    if (this.index.next !== undefined) {
      this.changeSlide(this.index.next);
    }
  }

  init() {
    this.bindEvents();
    this.transition(true);
    this.addSlideEvents();
    this.slideConfing();
    return this;
  }
}
