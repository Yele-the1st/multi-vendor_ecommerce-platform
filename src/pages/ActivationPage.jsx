import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstanceJsonData } from "../utils/axiosInstance";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        if (activation_token) {
          const res = await axiosInstanceJsonData.post("/users/activate-user", {
            activation_token,
          });
          console.log(res);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };

    sendRequest();
  }, [activation_token]);

  return (
    <div className=" w-full h-screen flex justify-center items-center">
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;
