export default function initHoursOfOperation() {
  const $weeks = document.querySelector('[data-weeks]')
  const weeksDay = $weeks.dataset.weeks.split(',').map(Number)
  const hoursWeeks = $weeks.dataset.hours.split(',').map(Number)
  const date = new Date()
  const dateNow = date.getDay()
  const hoursNow = date.getHours()

  const openWeeks = weeksDay.indexOf(dateNow) !== -1
  const hoursOpen = hoursNow >= hoursWeeks[0] && hoursNow < hoursWeeks[1]

  function isOpen() {
    if (openWeeks && hoursOpen) {
      $weeks.classList.add('aberto')
    }
  }
  isOpen()
}
