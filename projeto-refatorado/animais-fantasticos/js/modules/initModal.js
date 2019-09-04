export default class Modal {
  constructor(modalButton, container, closeModal) {
    this.$openModalButton = document.querySelector(modalButton);
    this.$modalContainer = document.querySelector(container);
    this.$closeModalButton = document.querySelector(closeModal);
    this.eventToggleModal = this.eventToggleModal.bind(this);
    this.clickOutsideOfTheModal = this.clickOutsideOfTheModal.bind(this);
  }

  clickOutsideOfTheModal(e) {
    if (e.target === this.$modalContainer) {
      this.toggleModal();
    }
  }

  eventToggleModal(e) {
    e.preventDefault();
    this.toggleModal();
  }

  toggleModal() {
    this.$modalContainer.classList.toggle('ativo');
  }

  addEventModal() {
    this.$openModalButton.addEventListener('click', this.eventToggleModal);
    this.$closeModalButton.addEventListener('click', this.eventToggleModal);
    this.$modalContainer.addEventListener('click', this.clickOutsideOfTheModal);
  }

  init() {
    if (
      this.$openModalButton &&
      this.$modalContainer &&
      this.$closeModalButton
    ) {
      this.addEventModal();
    }
    return this;
  }
}
