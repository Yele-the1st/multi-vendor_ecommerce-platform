import { createAction } from "@reduxjs/toolkit";

export const loadUserRequest = createAction("LoadUserRequest");
export const loadUserSuccess = createAction("LoadUserSuccess");
export const loadUserFail = createAction("LoadUserFail");
export const clearErrors = createAction("ClearErrors");
