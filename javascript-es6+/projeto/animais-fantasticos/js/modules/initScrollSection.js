export default function initScrollSection() {
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
