export const formInputFormatter = {
  formatName(str) {
    return str.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z ]/g, "");
  },

  formatBirth(str) {
    return str
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1/$2/$3")
      .replace(/\/{1,2}$/g, "")
      .trim();
  },
  formatPhone(str) {
    return str
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/\-{1,2}$/g, "")
      .trim();
  },
  formatEmail(str) {
    return str.replace(/[^a-zA-Z0-9@._-]/g, "").trim();
  },
  formatCardNumber(str) {
    return str
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{4})(\d{4})(\d{4})(\d{4})$/g, "$1-$2-$3-$4")
      .replace(/\-{1,2}$/g, "")
      .trim();
  },
  formatExpiration(str) {
    return str
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{2})(\d{2})$/g, "$1/$2")
      .replace(/\/{1,2}$/g, "")
      .trim();
  },
  formatSecurityCode(str) {
    return str.replace(/[^0-9]/g, "").slice(0, 4);
  },
};
