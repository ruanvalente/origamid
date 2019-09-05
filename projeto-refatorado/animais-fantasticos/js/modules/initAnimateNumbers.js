export default class AnimateNumbers {
  constructor(numbers, observerTarget, observer) {
    this.$numbers = document.querySelectorAll(numbers);
    this.$observerTarget = document.querySelector(observerTarget);
    this.observer = observer;

    this.handleMutation = this.handleMutation.bind(this);
  }

  static incrementNumber(number) {
    const totalNumber = +number.innerText;
    const increments = Math.floor(totalNumber / 100);
    let startCounter = 0;
    const timer = setInterval(() => {
      startCounter += increments;
      number.innerText = startCounter;
      if (startCounter > totalNumber) {
        number.innerText = totalNumber;
        clearInterval(timer);
      }
    }, 25 * Math.random);
  }

  handleAnimate() {
    this.$numbers.forEach(number => this.constructor.incrementNumber(number));
  }

  handleMutation(mutation) {
    const containsActiveClasse = mutation[0].target.classList.contains('ativo');
    this.observer.disconnect();
    if (containsActiveClasse) {
      this.handleAnimate();
    }
  }

  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.$observerTarget, { attributes: true });
  }

  init() {
    if (this.$numbers && this.$observerTarget) {
      this.addMutationObserver();
    }
    return this;
  }
}
