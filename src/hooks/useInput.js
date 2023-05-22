import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const { message, errorStat } = validateValue(enteredValue);

  let errorMessage = message;

  //   convertToBoolean is used to change what ever value we get from the errorStat
  //   to a Boolean value which is then used to ser valueisValid

  const convertToBoolean = (value) => {
    return value === "true";
  };
  const valueIsValid = convertToBoolean(errorStat);

  //   isTouched would determine when the input would be validated
  //   and checked to have an error as below

  const hasError = !valueIsValid && isTouched;

  //   here the input is validated on every value Change, it could be
  //   also validated on blur using the onBlur anf creating an onBlur
  //   handler and the setting is touched to on blur.

  // we could also validate the field directly by getting rid of the isTouched
  // state

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
    setIsTouched(true);
  };

  //   const inputBlurHandler = (event) => {
  //     setIsTouched(true);
  //   };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    // inputBlurHandler,
    errorMessage,
    reset,
    isTouched,
  };
};

export default useInput;
