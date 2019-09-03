import outSideClick from './initOutside.js'

export default function initMenuMobile() {
  const $buttonMenu = document.querySelector('[data-js="button-menu"]')
  const $listMenu = document.querySelector('[data-js="list-menu"]')
  const events = ['click', 'touchstart']

  function openMenu() {
    $buttonMenu.classList.add('active')
    $listMenu.classList.add('active')

    outSideClick($listMenu, events, () => {
      $buttonMenu.classList.remove('active')
      $listMenu.classList.remove('active')
    })
  }
  events.forEach(userEvents =>
    $buttonMenu.addEventListener(userEvents, openMenu)
  )
}
