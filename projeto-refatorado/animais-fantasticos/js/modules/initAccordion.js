export default function initAccordion() {
  const $accordionList = document.querySelectorAll(
    '[data-js="accordion-list"] dt'
  );

  function accordionActive(event) {
    event.currentTarget.classList.toggle('ativo');
    event.currentTarget.nextElementSibling.classList.toggle('ativo');
  }

  if ($accordionList.length) {
    $accordionList[0].nextElementSibling.classList.add('ativo');
    $accordionList[0].classList.add('ativo');

    $accordionList.forEach(item =>
      item.addEventListener('click', accordionActive)
    );
  }
}
