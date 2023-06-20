import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstanceJsonDataWithCredentials } from "../utils/axiosInstance";
import { toast } from "react-toastify";

const ShopActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        if (activation_token) {
          const res = await axiosInstanceJsonDataWithCredentials.post(
            "/shops//activate-shop",
            {
              activation_token,
            }
          );
          toast.success(res.data.message);
          console.log(res.data);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };

    sendRequest();
  }, []);

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

export default ShopActivationPage;
