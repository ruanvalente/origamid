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

function initScroll() {
  const $internalLinks = document.querySelectorAll('a[href^="#"]')

  function scrollLinks(event) {
    event.preventDefault()
    const href = this.getAttribute('href')
    const $toSection = document.querySelector(href)
    $toSection.scrollIntoView({
      inline: 'start',
      behavior: 'smooth'
    })
  }
  $internalLinks.forEach(link => link.addEventListener('click', scrollLinks))
}

function initSectionScroll() {
  const $scrollSection = document.querySelectorAll('.js-scroll')

  function activeScrollSection(event) {
    $scrollSection.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top
      if (sectionTop < 0) {
        section.classList.add('ativo')
      }
    })
  }
  window.addEventListener('scroll', activeScrollSection)
}

initSectionScroll()
initScroll()
initAccordion()
initTabMenu()
