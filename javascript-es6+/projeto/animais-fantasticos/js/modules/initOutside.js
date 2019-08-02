export default function outSideClick(element, events, callback) {
  const outside = 'data-outside'
  const $html = document.documentElement

  if (!element.hasAttribute(outside)) {
    events.forEach(userEvent => {
      $html.addEventListener(userEvent, handleOutSideClick)
    })
    element.setAttribute(outside, '')
  }

  function handleOutSideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside)
      events.forEach(userEvent => {
        $html.removeEventListener(userEvent, handleOutSideClick)
      })
      callback()
    }
  }
}
