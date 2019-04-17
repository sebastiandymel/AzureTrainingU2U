const EventState = Object.freeze({ READY: "READY", PUBLISHED: "PUBLISHED", CANCELLED: "CANCELLED" });

class NumberIntegrationEvent  {
  constructor(number, state) {
    this.number = number;
    this.state = state;
  }
}

module.exports = {
  EventState: EventState,
  NumberIntegrationEvent: NumberIntegrationEvent
};