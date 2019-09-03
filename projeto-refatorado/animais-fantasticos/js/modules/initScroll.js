export default function initScroll() {
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
