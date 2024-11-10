class FormState {
  constructor() {
    // 1. 행성 선택 여부
    this.isPlanetSelected = false;

    // 2. 입력란
    this.isNameValid = false;
    this.isBirthValid = false;
    this.isPhoneValid = false;
    this.isEmailValid = false;
    this.isCardNumberValid = false;
    this.isExpirationValid = false;
    this.isSecurityValid = false;

    // 3. CERTIFICATION 버튼
    this.isPhoneVerified = false;
    this.isEmailVerfied = false;

    // 4. 체크박스
    this.isAccidentRulesChecked = false;
    this.isPersonalInfoChecked = false;
    this.isAllConfirmedChecked = false;
  }

  // get 쓴 이유: 필요할 때마다 동적으로 계산
  // 외부에서 formState.isInputValid 이렇게 가져올 수 있음
  get isInputsValid() {
    return (
      this.isNameValid &&
      this.isBirthValid &&
      this.isPhoneValid &&
      this.isEmailValid &&
      this.isCardNumberValid &&
      this.isExpirationValid &&
      this.isSecurityValid
    );
  }

  get isCertificated() {
    return this.isPhoneVerified && this.isEmailVerfied;
  }

  get isCheckValid() {
    return (
      this.isAccidentRulesChecked &&
      this.isPersonalInfoChecked &&
      this.isAllConfirmedChecked
    );
  }

  get isFormValid() {
    return (
      this.isPlanetSelected &&
      this.isInputsValid &&
      this.isCertificated &&
      this.isCheckValid
    );
  }

  setPlanetSelected() {
    this.isPlanetSelected = true;
  }

  setNameValid(value) {
    this.isNameValid = value;
  }

  setBirthValid(value) {
    this.isBirthValid = value;
  }

  setPhoneValid(value) {
    this.isPhoneValid = value;
  }

  setEmailValid(value) {
    this.isEmailValid = value;
  }

  setCardNumberValid(value) {
    this.isCardNumberValid = value;
  }

  setExpirationValid(value) {
    this.isExpirationValid = value;
  }

  setSecurityValid(value) {
    this.isSecurityValid = value;
  }

  setPhoneVerified(value) {
    this.isPhoneVerified = value;
  }

  setEmailVerified(value) {
    this.isEmailVerfied = value;
  }

  setAccidentRulesChecked(value) {
    this.isAccidentRulesChecked = value;
  }

  setPersonalInfoChecked(value) {
    this.isPersonalInfoChecked = value;
  }

  setAllConfirmedChecked(value) {
    this.isAllConfirmedChecked = value;
  }

  reset() {
    this.isPlanetSelected = false;

    this.isNameValid = false;
    this.isBirthValid = false;
    this.isPhoneValid = false;
    this.isEmailValid = false;
    this.isCardNumberValid = false;
    this.isExpirationValid = false;
    this.isSecurityValid = false;

    this.isPhoneVerified = false;
    this.isEmailVerfied = false;

    this.isAccidentRulesChecked = false;
    this.isPersonalInfoChecked = false;
    this.isAllConfirmedChecked = false;
  }
}

export default FormState;
