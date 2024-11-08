class ReservationState {
  constructor() {
    this.planet = "";
    this.name = "";
    this.birth = "";
    this.phone = "";
    this.email = "";
  }

  setPlanet(planet) {
    this.planet = {
      name: planet.name,
      price: planet.price * 2,
    };
  }

  setName(name) {
    this.name = name;
  }

  setBirth(birth) {
    this.birth = birth;
  }

  setPhone(phone) {
    this.phone = phone;
  }

  setEmail(email) {
    this.email = email;
  }
}

export default ReservationState;
