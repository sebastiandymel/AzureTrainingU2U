const ev = require('./events');

class Repository {

  constructor() {
    this.events = [];
    this.number = 0;
  }

  getNumber() {
    return this.number;
  }

  setNumber(value) {
    this.number = value;
  }

  addEvent(event) {
    this.events.push(event);
  }

  updateEvent(event, state) {
    event.state = state;
  }

  getReadyEvents() {
    return this.events.filter(e => e.state === ev.EventState.READY);
  }

}

module.exports = new Repository();