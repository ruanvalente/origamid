export default function initTooltip() {
  const $tooltips = document.querySelectorAll('[data-js="tooltip"]')

  $tooltips.forEach(item => item.addEventListener('mouseover', onMouseOver))

  function onMouseOver(e) {
    const tooltipBox = createTooltipBox(this)

    onMouseLeave.tooltipBox = tooltipBox
    onMouseLeave.element = this
    onMouseMove.tooltipBox = tooltipBox

    this.addEventListener('mouseleave', onMouseLeave)
    this.addEventListener('mousemove', onMouseMove)
  }

  const onMouseLeave = {
    handleEvent() {
      this.tooltipBox.remove()
      this.element.removeEventListener('mouseleave', onMouseLeave)
      this.element.removeEventListener('mousemove', onMouseMove)
    }
  }

  const onMouseMove = {
    handleEvent(event) {
      this.tooltipBox.style.top = event.pageY + 20 + 'px'
      this.tooltipBox.style.left = event.pageX + 20 + 'px'
    }
  }

  function createTooltipBox(element) {
    const tooltipBox = document.createElement('div')
    const textTooltipBox = element.getAttribute('aria-label')
    tooltipBox.classList.add('tooltip')
    tooltipBox.innerText = textTooltipBox
    document.body.appendChild(tooltipBox)
    return tooltipBox
  }
}
