import { axiosInstanceGet } from "../../utils/axiosInstance";
import {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
} from "../createActions/user.createActions";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await axiosInstanceGet.get("/users/get-user");
    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};
