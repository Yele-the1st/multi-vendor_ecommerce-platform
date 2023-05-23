export const emailValidation = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value.trim() === "") {
    return { message: "Email is required.", errorStat: "false" };
  } else if (!emailRegex.test(value)) {
    return {
      message: "Please enter a valid email address.",
      errorStat: "false",
    };
  } else {
    return { message: "", errorStat: "true" };
  }
};

export const passwordValidation = (value) => {
  if (value.trim() === "") {
    return { message: "Password is required", errorStat: "false" };
  } else {
    return { message: "", errorStat: "true" };
  }
};

export const fullnameValidation = (value) => {
  const nameParts = value.split(" ");
  if (value.trim() === "") {
    return { message: "Please enter your full name.", errorStat: "false" };
  } else if (!/^[a-zA-Z\s]+$/.test(value)) {
    return {
      message: "Full name should only contain letters and spaces.",
      errorStat: "false",
    };
  } else if (nameParts.length < 2) {
    return {
      message: "Please enter your first name and last name.",
      errorStat: "false",
    };
  } else {
    return { message: "", errorStat: "true" };
  }
};
