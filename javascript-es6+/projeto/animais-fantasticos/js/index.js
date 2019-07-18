'use strict'

function initTabMenu() {
  const $tabMenu = document.querySelectorAll('.js-tabmenu li')
  const $tabContent = document.querySelectorAll('.js-tabcontent section')

  if ($tabContent.length && $tabMenu.length) {
    $tabContent[0].classList.add('ativo')

    function activeTab(index) {
      $tabContent.forEach(content => content.classList.remove('ativo'))
      $tabContent[index].classList.add('ativo')
    }

    $tabMenu.forEach((itemMenu, index) => {
      itemMenu.addEventListener('click', () => {
        activeTab(index)
      })
    })
  }
}

function initAccordion() {
  const $accordionList = document.querySelectorAll('.js-accordion-list dt')
  if ($accordionList.length) {
    $accordionList[0].classList.add('ativo')
    $accordionList[0].nextElementSibling.classList.add('ativo')

    function accordionActive() {
      this.classList.toggle('ativo')
      this.nextElementSibling.classList.toggle('ativo')
    }

    $accordionList.forEach(item =>
      item.addEventListener('click', accordionActive)
    )
  }
}

initAccordion()
initTabMenu()
