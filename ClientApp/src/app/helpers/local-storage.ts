import {UserToken} from "../models/user-token";

export const setLocalUserToken = (userToken: UserToken) => {
  localStorage.setItem("user", JSON.stringify(userToken));
};

export const getLocalUserToken = () => {
  return localStorage.getItem("user");
};

export const removeLocalUserToken = () => {
  localStorage.removeItem("user");
};

export const setSessionUserToken = (userToken: UserToken) => {
  sessionStorage.setItem("user", JSON.stringify(userToken));
};

export const getSessionUserToken = () => {
  return sessionStorage.getItem("user");
};

export const removeSessionUserToken = () => {
  sessionStorage.removeItem("user");
};
