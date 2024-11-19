class FormValidator {
  constructor() {
    this.validationState = {
      isPlanetSelected: false,

      isNameValid: false,
      isBirthValid: false,
      isPhoneValid: false,
      isEmailValid: false,
      isCardNumberValid: false,
      isExpirationValid: false,
      isSecurityValid: false,

      isPhoneVerified: false,
      isEmailVerfied: false,

      isAccidentRulesChecked: false,
      isPersonalInfoChecked: false,
      isAllConfirmedChecked: false,
    };
  }

  // 실제 검증 로직 포함
  validateName(name) {
    const isValid = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z ]+$/.test(name) && name.length > 0;
    this.validationState.isNameValid = isValid;
    return isValid;
  }

  validateBirth(birth) {
    const [year, month, date] = birth.split("/").map(Number);
    const currentYear = new Date().getFullYear();
    const lastDay = new Date(year, month, 0).getDate();

    const isValid =
      year <= currentYear - 20 &&
      year >= currentYear - 100 &&
      month >= 1 &&
      month <= 12 &&
      date <= lastDay &&
      date >= 1;

    this.validationState.isBirthValid = isValid;
    return isValid;
  }

  validatePhone(phone) {
    const isValid = /^\d{3}-\d{4}-\d{4}$/.test(phone);
    this.validationState.isPhoneValid = isValid;
    return isValid;
  }

  validateEmail(email) {
    const isValid = /^.+@.+$/.test(email);
    this.validationState.isEmailValid = isValid;
    return isValid;
  }

  // 인증 관련 메서드
  verifyPhone() {
    if (!this.validationState.isPhoneValid) return false;
    this.validationState.isPhoneVerified = true;
    return true;
  }

  verifyEmail() {
    if (!this.validationState.isEmailValid) return false;
    this.validationState.isEmailVerfied = true;
    return true;
  }

  validateCardNumber(cardNumber) {
    const isValid = /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(cardNumber);
    this.validationState.isCardNumberValid = isValid;
    return isValid;
  }

  validateExpiration(expiration) {
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const [month, year] = expiration.split("/").map(Number);

    const isValid = !(
      month > 12 ||
      month < 1 ||
      year < currentYear ||
      (year === currentYear && month < currentMonth) ||
      expiration.length < 5
    );

    this.validationState.isExpirationValid = isValid;
    return isValid;
  }

  validateSecurityCode(securityCode) {
    const isValid = securityCode.length === 4;
    this.validationState.isSecurityValid = isValid;
    return isValid;
  }

  setPlanetSelected() {
    this.validationState.isPlanetSelected = true;
  }

  setAccidentRulesChecked(checked) {
    this.validationState.isAccidentRulesChecked = checked;
  }

  setPersonalInfoChecked(checked) {
    this.validationState.isPersonalInfoChecked = checked;
  }

  setAllConfirmChecked(checked) {
    this.validationState.isAllConfirmedChecked = checked;
  }

  // Getters for computed state
  get isInputsValid() {
    return (
      this.validationState.isNameValid &&
      this.validationState.isBirthValid &&
      this.validationState.isPhoneValid &&
      this.validationState.isEmailValid &&
      this.validationState.isCardNumberValid &&
      this.validationState.isExpirationValid &&
      this.validationState.isSecurityValid
    );
  }

  get isVerified() {
    return (
      this.validationState.isPhoneVerified &&
      this.validationState.isEmailVerfied
    );
  }

  get isCheckValid() {
    return (
      this.validationState.isAccidentRulesChecked &&
      this.validationState.isPersonalInfoChecked &&
      this.validationState.isAllConfirmedChecked
    );
  }

  get isFormValid() {
    return (
      this.validationState.isPlanetSelected &&
      this.isInputsValid &&
      this.isVerified &&
      this.isCheckValid
    );
  }

  reset() {
    Object.keys(this.validationState).forEach((key) => {
      this.validationState[key] = false;
    });

    this.isPhoneVerified = false;
    this.isEmailVerfied = false;

    this.isAccidentRulesChecked = false;
    this.isPersonalInfoChecked = false;
    this.isAllConfirmedChecked = false;
  }
}

export default FormValidator;
