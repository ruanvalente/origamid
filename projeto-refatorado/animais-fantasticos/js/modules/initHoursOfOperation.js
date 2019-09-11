export default class HoursOfOperation {
  constructor(weeks) {
    this.$weeks = document.querySelector(weeks);
  }

  getWeeksDay() {
    this.weeksDay = this.$weeks.dataset.weeks.split(',').map(Number);
    this.hoursWeeks = this.$weeks.dataset.hours.split(',').map(Number);
  }

  getDateNow() {
    this.date = new Date();
    this.dateNow = this.date.getDay();
    this.hoursNow = this.date.getUTCHours() - 3;
  }

  isOpen() {
    const openWeeks = this.weeksDay.indexOf(this.dateNow) !== -1;
    const hoursOpen =
      this.hoursNow >= this.hoursWeeks[0] && this.hoursNow < this.hoursWeeks[1];
    return openWeeks && hoursOpen;
  }

  activeOpen() {
    if (this.isOpen()) {
      this.$weeks.classList.add('aberto');
    }
  }

  init() {
    if (this.$weeks) {
      this.getWeeksDay();
      this.getDateNow();
      this.isOpen();
    }
    return this;
  }
}
