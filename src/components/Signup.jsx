import useInput from "../hooks/useInput";
import logo from "../assets/logo-blue.png";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import {
  emailValidation,
  passwordValidation,
  fullnameValidation,
} from "../validation/validation";
import { axiosInstanceFormData } from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Signup = () => {
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const {
    value: fullname,
    isValid: enteredFullnameIsValid,
    hasError: fullnameInputHasError,
    valueChangeHandler: fullnameChangeHandler,
    errorMessage: fullnameError,
    isTouched: fullnameTouched,
    reset: resetFullnameInput,
  } = useInput(fullnameValidation);

  const {
    value: email,
    isValid: enteredEmailIsValid,
    hasError: emialInputHasError,
    valueChangeHandler: emailChangeHandler,
    errorMessage: emailError,
    isTouched: emailTouched,
    reset: resetEmailInput,
  } = useInput(emailValidation);

  const {
    value: password,
    isValid: enteredPasswordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    errorMessage: passwordError,
    reset: resetPasswordInput,
  } = useInput(passwordValidation);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  let formIsValid = false;

  if (
    enteredFullnameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    password
  ) {
    formIsValid = true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return; // Prevent form submission if formIsValid is false
    }

    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("fullname", fullname);
    newForm.append("email", email);
    newForm.append("password", password);

    for (const entry of newForm.entries()) {
      console.log(entry);
    }

    try {
      const response = await axiosInstanceFormData.post(
        "/users/register-user",
        newForm
      );
      toast.success(response.data.message);
      resetEmailInput();
      resetPasswordInput();
      resetFullnameInput();
      setAvatar(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
        <div className="sm-mx-auto sm:w-full sm:max-w-md">
          {/* <Link to={`/`}>
            <img className=" mx-auto w-auto h-10" src={logo} alt="" />
          </Link> */}

          <h2 className=" mt-6 text-center text-3xl font-extrabold text-gray-900 font-Fira">
            Register as a new user
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
          <form className=" space-y-6" onSubmit={handleSubmit}>
            <div className=" flex flex-col relative mb-3 w-full   ">
              <div
                className={` flex flex-row items-center border  overflow-hidden h-12 rounded-[16px] px-5  transition-colors delay-0, transition-border duration-200 ease-linear delay-0 ${
                  !fullnameInputHasError
                    ? fullnameTouched && fullname
                      ? "border-[green] bg-indigo-50 "
                      : "border-[#B5B6BB] focus-within:border-black"
                    : "border-[#FEABAB] bg-[#FFEEEE]"
                }  `}
              >
                <div className=" flex-1 flex flex-row items-center ">
                  <input
                    name="fullname"
                    placeholder="Full name"
                    type="text"
                    value={fullname}
                    onChange={fullnameChangeHandler}
                    className=" outline-none font-light font-Ubuntu tracking-wider h-full w-full text-base overflow-hidden whitespace-nowrap text-ellipsis bg-transparent "
                  />
                  {fullnameInputHasError && (
                    <ExclamationTriangleIcon className="w-6 h-6 stroke-1  stroke-[red]" />
                  )}
                  {!fullnameInputHasError && fullname && (
                    <CheckIcon className="w-6 h-6 stroke-2  stroke-[green]" />
                  )}
                </div>
              </div>
              {fullnameInputHasError && (
                <p className=" font-Ubuntu text-red-500 mt-1 text-sm">
                  {fullnameError}
                </p>
              )}
            </div>
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
                    autoComplete="email"
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

            <div className="flex text-sm justify-between">
              <div className=" flex items-center gap-x-3">
                <div className=" h-12 w-12 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className=" h-full w-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <label
                  htmlFor="file-input"
                  className="rounded-md bg-gray-100 px-2.5 py-1.5 text-sm font-light font-Ubuntu text-gray-900 shadow-sm  hover:bg-gray-200"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className=" sr-only"
                  />
                </label>
              </div>
            </div>

            <footer>
              <button
                disabled={
                  !enteredEmailIsValid ||
                  !enteredPasswordIsValid ||
                  !enteredFullnameIsValid
                }
                type="submit"
                className={` relative flex items-center justify-center flex-row border border-transparent transition-all duration-150 ease-linear delay-0 text-white h-12 px-5 rounded-[16px] w-full min-w-max  ${
                  !enteredEmailIsValid ||
                  !enteredPasswordIsValid ||
                  !enteredFullnameIsValid
                    ? " bg-[#0A0B1E12] cursor-not-allowed"
                    : " bg-indigo-600 hover:bg-indigo-700 "
                }`}
              >
                <span className=" tracking-wide text-base font-Ubuntu font-medium ">
                  Sign up
                </span>
              </button>
            </footer>
            <div className=" flex tracking-wide flex-row items-center justify-center ">
              <div className=" text-sm font-Ubuntu mr-2 ">
                Already have an account?
              </div>
              <span className="text-sm tracking-wide font-Ubuntu text-indigo-600">
                <Link to={`/auth/login`}>Sign in</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
