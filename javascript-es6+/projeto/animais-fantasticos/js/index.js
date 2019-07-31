'use strict'

function initTab() {
  const $tabMenu = document.querySelectorAll('[data-js="tabmenu"] li')
  const $tabContent = document.querySelectorAll('[data-js="content"] section')

  if ($tabContent.length && $tabMenu.length) {
    $tabContent[0].classList.add('ativo')

    function activeTab(index) {
      $tabContent.forEach(element => element.classList.remove('ativo'))
      const direction = $tabContent[index].dataset.anime
      $tabContent[index].classList.add('ativo', direction)
    }

    $tabMenu.forEach((itemMenu, index) => {
      itemMenu.addEventListener('click', () => {
        activeTab(index)
      })
    })
  }
}

function initAccordion() {
  const $accordionList = document.querySelectorAll(
    '[data-js="accordion-list"] dt'
  )

  if ($accordionList.length) {
    $accordionList[0].nextElementSibling.classList.add('ativo')
    $accordionList[0].classList.add('ativo')

    function accordionActive(event) {
      event.currentTarget.classList.toggle('ativo')
      event.currentTarget.nextElementSibling.classList.toggle('ativo')
    }

    $accordionList.forEach(item =>
      item.addEventListener('click', accordionActive)
    )
  }
}

function initScroll() {
  const $links = document.querySelectorAll('[data-js="menu"] a[href^="#"]')

  function activeScroll(event) {
    event.preventDefault()
    const href = this.getAttribute('href')
    const toSection = document.querySelector(href)
    toSection.scrollIntoView({
      inline: 'start',
      behavior: 'smooth'
    })
  }
  $links.forEach(link => link.addEventListener('click', activeScroll))
}

function initScrollSection() {
  const $sections = document.querySelectorAll('[data-js="scroll"]')

  if ($sections.length) {
    function activeSectionScroll() {
      $sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top
        const haltOfTheWindow = (sectionTop - window.innerHeight) * 0.6
        if (haltOfTheWindow < 0) {
          section.classList.add('ativo')
        }
      })
    }
    activeSectionScroll()
    window.addEventListener('scroll', activeSectionScroll)
  }
}

initScrollSection()
initScroll()
initTab()
initAccordion()
