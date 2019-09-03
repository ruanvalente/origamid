export default function initModal() {
  const $openModalButton = document.querySelector('[data-js="abrir-modal"]')
  const $modalContainer = document.querySelector('[data-js="modal-container"]')
  const $closeModalButton = document.querySelector('[data-js="fechar-modal"]')

  if ($openModalButton && $modalContainer && $closeModalButton) {
    function toggleModal(e) {
      e.preventDefault()
      $modalContainer.classList.toggle('ativo')
    }

    function clickOutsideOfTheModal(e) {
      if (e.target === this) {
        toggleModal(e)
      }
    }

    $openModalButton.addEventListener('click', toggleModal)
    $closeModalButton.addEventListener('click', toggleModal)
    $modalContainer.addEventListener('click', clickOutsideOfTheModal)
  }
}
