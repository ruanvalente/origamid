export default function initAnimateNumbers() {
  const $numbers = document.querySelectorAll('[data-js="number"]');
  const $observerTarget = document.querySelector('.numeros');
  const observer = new MutationObserver(handleMutation);

  function handleAnimate() {
    $numbers.forEach(number => {
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
    });
  }
  function handleMutation(mutation) {
    const containsActiveClasse = mutation[0].target.classList.contains('ativo');
    if (containsActiveClasse) {
      observer.disconnect();
      handleAnimate();
    }
  }
  observer.observe($observerTarget, { attributes: true });
}
