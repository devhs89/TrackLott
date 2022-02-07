import {UserToken} from "../models/user-token";

export const setLocalUserToken = (userObj: UserToken) => {
  localStorage.setItem("user", JSON.stringify(userObj));
};

export const getLocalUserToken = () => {
  return localStorage.getItem("user");
};

export const removeLocalUserToken = () => {
  localStorage.removeItem("user");
};

export const setSessionUserToken = (userObj: UserToken) => {
  sessionStorage.setItem("user", JSON.stringify(userObj));
};

export const getSessionUserToken = () => {
  return sessionStorage.getItem("user");
};

export const removeSessionUserToken = () => {
  sessionStorage.removeItem("user");
};
