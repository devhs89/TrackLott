import {AppUser} from "../models/app-user";

export const setLocalUserToken = (userObj: AppUser) => {
  localStorage.setItem("user", JSON.stringify(userObj));
};

export const getLocalUserToken = () => {
  return localStorage.getItem("user");
};

export const removeLocalUserToken = () => {
  localStorage.removeItem("user");
};

export const setSessionUserToken = (userObj: AppUser) => {
  sessionStorage.setItem("user", JSON.stringify(userObj));
};

export const getSessionUserToken = () => {
  return sessionStorage.getItem("user");
};

export const removeSessionUserToken = () => {
  sessionStorage.removeItem("user");
};
