export const emailValidation = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value.trim() === "") {
    return { message: "Email is required.", errorStat: true };
  } else if (!emailRegex.test(value)) {
    return {
      message: "Please enter a valid email address.",
      errorStat: true,
    };
  } else {
    return { message: "", errorStat: false };
  }
};

export const passwordValidation = (value) => {
  if (value.trim() === "") {
    return { message: "Password is required", errorStat: true };
  } else if (value.length < 4) {
    return {
      message: "Password must have a minimum of 4 characters",
      errorStat: true,
    };
  } else {
    return { message: "", errorStat: false };
  }
};

export const fullnameValidation = (value) => {
  const nameParts = value.split(" ");
  if (value.trim() === "") {
    return { message: "Please enter your full name.", errorStat: true };
  } else if (!/^[a-zA-Z\s]+$/.test(value)) {
    return {
      message: "Full name should only contain letters and spaces.",
      errorStat: true,
    };
  } else if (nameParts.length < 2) {
    return {
      message: "Please enter your first name and last name.",
      errorStat: "false",
    };
  } else {
    return { message: "", errorStat: false };
  }
};

export const phoneNumberValidation = (value) => {
  if (value.trim() === "") {
    return { message: "Please enter a phone number.", errorStat: true };
  } else if (!/^\d{11}$/.test(value)) {
    return {
      message: "Please enter a valid 10-digit phone number.",
      errorStat: true,
    };
  } else {
    return { message: "", errorStat: false };
  }
};

export const shopNameValidation = (value) => {
  if (value.trim() === "") {
    return { message: "Please enter a shop name.", errorStat: true };
  } else {
    return { message: "", errorStat: false };
  }
};

export const addressValidation = (value) => {
  if (value.trim() === "") {
    return { message: "Please enter an address.", errorStat: true };
  } else {
    return { message: "", errorStat: false };
  }
};

export const zipcodeValidation = (value) => {
  if (value.trim() === "") {
    return { message: "Please enter a zipcode.", errorStat: true };
  } else if (!/^\d{6}$/.test(value)) {
    return {
      message: "Please enter a valid 6-digit zipcode.",
      errorStat: true,
    };
  } else {
    return { message: "", errorStat: false };
  }
};
