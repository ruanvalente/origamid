import AnimateNumbers from './initAnimateNumbers.js';

export default function fetchAnimals(url, target) {
  async function getFetchAnimals() {
    try {
      const dataAnimals = await fetch(url);
      const dataResponseAnimals = await dataAnimals.json();

      dataResponseAnimals.forEach(animal => createAnimal(animal));
      const animateNumbers = new AnimateNumbers(
        '[data-js="number"]',
        '.numeros'
      );
      animateNumbers.init();
    } catch (error) {
      console.log(error);
    }
  }

  function createAnimal(animal) {
    const $numbersGrid = document.querySelector(target);
    const $divAnimal = document.createElement('div');
    $divAnimal.classList.add('numero-animal');
    $divAnimal.innerHTML = `
      <h3>${animal.especie}</h3>
      <span data-js="number">${animal.total}</span>
    `;
    $numbersGrid.appendChild($divAnimal);
  }

  return getFetchAnimals();
}
