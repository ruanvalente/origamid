import outSideClick from './initOutside.js'

export default function initDropdownMenu() {
  const $dropdownMenus = document.querySelectorAll('[data-js="dropdown"]')
  const events = ['touchstart', 'click']

  $dropdownMenus.forEach(menu => {
    events.forEach(userEvent => {
      menu.addEventListener(userEvent, handleClick)
    })
  })

  function handleClick(e) {
    e.preventDefault()
    this.classList.add('active')
    outSideClick(this, events, () => {
      this.classList.remove('active')
    })
  }
}
