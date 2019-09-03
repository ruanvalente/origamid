import initAnimateNumbers from './initAnimateNumbers.js'

export default function initFetchAnimals() {
  async function fetchAnimals(url) {
    try {
      const dataAnimals = await fetch(url)
      const dataResponseAnimals = await dataAnimals.json()

      dataResponseAnimals.forEach(animal => createAnimal(animal))
      initAnimateNumbers()
    } catch (error) {
      console.log(error)
    }
  }

  function createAnimal(animal) {
    const $numbersGrid = document.querySelector('.numeros-grid')
    const $divAnimal = document.createElement('div')
    $divAnimal.classList.add('numero-animal')
    $divAnimal.innerHTML = `
      <h3>${animal.especie}</h3>
      <span data-js="number">${animal.total}</span>
    `
    $numbersGrid.appendChild($divAnimal)
  }

  fetchAnimals('./animaisapi.json')
}
