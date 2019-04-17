class Repository {

  constructor() {
    this.number = 0;
  }

  getNumber() {
    return this.number;
  }

  setNumber(value) {
    this.number = value;
  }

}

module.exports = new Repository();