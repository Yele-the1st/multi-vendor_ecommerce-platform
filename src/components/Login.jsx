import useInput from "../hooks/useInput";
import {} from "react-icons";
import logo from "../assets/logo-blue.png";
import { Link } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const emailValidation = (value) => {
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

const passwordValidation = (value) => {
  if (value.trim() === "") {
    return { message: "Password is required", errorStat: "false" };
  } else {
    return { message: "", errorStat: "true" };
  }
};

const Login = () => {
  const [visible, setVisible] = useState(false);
  const {
    value: email,
    isValid: enteredEmailIsValid,
    hasError: emialInputHasError,
    valueChangeHandler: emailChangeHandler,
    errorMessage: emailError,
    isTouched: emailTouched,
  } = useInput(emailValidation);

  const {
    value: password,
    isValid: enteredPasswordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    errorMessage: passwordError,
  } = useInput(passwordValidation);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
        <div className="sm-mx-auto sm:w-full sm:max-w-md">
          {/* <Link to={`/`}>
            <img className=" mx-auto w-auto h-10" src={logo} alt="" />
          </Link> */}

          <h2 className=" mt-6 text-center text-3xl font-extrabold text-gray-900 font-Fira">
            Log in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
          <form className=" space-y-6">
            <div className=" flex flex-col relative mb-3 w-full   ">
              <div
                className={` flex flex-row items-center border  overflow-hidden h-12 rounded-[16px] px-5  transition-colors delay-0, transition-border duration-200 ease-linear delay-0 ${
                  !emialInputHasError
                    ? emailTouched && email
                      ? "border-[green] bg-indigo-50 "
                      : "border-[#B5B6BB] focus-within:border-black"
                    : "border-[#FEABAB] bg-[#FFEEEE]"
                }  `}
              >
                <div className=" flex-1 flex flex-row items-center ">
                  <input
                    name="email"
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={emailChangeHandler}
                    className=" outline-none font-light font-Ubuntu tracking-wider h-full w-full text-base overflow-hidden whitespace-nowrap text-ellipsis bg-transparent "
                  />
                  {emialInputHasError && (
                    <ExclamationTriangleIcon className="w-6 h-6 stroke-1  stroke-[red]" />
                  )}
                  {!emialInputHasError && email && (
                    <CheckIcon className="w-6 h-6 stroke-2  stroke-[green]" />
                  )}
                </div>
              </div>
              {emialInputHasError && (
                <p className=" font-Ubuntu text-red-500 mt-1 text-sm">
                  {emailError}
                </p>
              )}
            </div>
            {email && !emialInputHasError && (
              <div className=" flex flex-col relative mb-3 w-full   ">
                <div
                  className={` flex flex-row items-center border   overflow-hidden h-12 rounded-[16px] px-5  transition-colors delay-0, transition-border duration-200 ease-linear delay-0 ${
                    !passwordHasError
                      ? "border-[#B5B6BB] focus-within:border-black"
                      : "border-[#FEABAB] bg-[#FFEEEE]"
                  } `}
                >
                  <div className=" flex-1 flex flex-row items-center ">
                    <input
                      name="password"
                      placeholder="Password"
                      type={visible ? "text" : "password"}
                      value={password}
                      onChange={passwordChangeHandler}
                      className=" outline-none font-light font-Ubuntu h-full w-full text-base overflow-hidden whitespace-nowrap text-ellipsis bg-transparent "
                    />
                    {!visible ? (
                      <EyeIcon
                        onClick={() => setVisible(true)}
                        className="w-6 h-6 stroke-1 "
                      />
                    ) : (
                      <EyeSlashIcon
                        onClick={() => setVisible(false)}
                        className="w-6 h-6 stroke-1 "
                      />
                    )}
                  </div>
                </div>
                {passwordHasError && (
                  <p className=" font-Ubuntu text-red-500 mt-1 mb-3 text-sm">
                    {passwordError}
                  </p>
                )}
              </div>
            )}
            {email && !emialInputHasError && (
              <div className="flex mt-4 text-sm justify-between">
                <div className="flex items-center gap-2">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <p className=" font-Ubuntu tracking-wide">Remember me</p>
                </div>
                <Link
                  to="/"
                  className="font-normal font-Ubuntu text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            <footer>
              <button
                disabled={!enteredEmailIsValid || !enteredPasswordIsValid}
                type="submit"
                className={` relative flex items-center justify-center flex-row border border-transparent transition-all duration-150 ease-linear delay-0 text-white h-12 px-5 rounded-[16px] w-full min-w-max  ${
                  !enteredEmailIsValid || !enteredPasswordIsValid
                    ? " bg-[#0A0B1E12] cursor-not-allowed"
                    : " bg-indigo-600 hover:bg-indigo-700 "
                }`}
              >
                <span className=" text-base font-Ubuntu font-medium ">
                  Login
                </span>
              </button>
            </footer>
            <div className=" flex tracking-wide flex-row items-center justify-center ">
              <div className=" text-sm font-Ubuntu mr-2 ">
                Don't have an account yet?
              </div>
              <span className="text-sm tracking-wide font-Ubuntu text-indigo-600">
                <Link to={`/auth/signup`}>Sign up</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;