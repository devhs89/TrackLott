import {UserToken} from "../models/user-token";
import {LottoResult, SavedLottoResult} from "../models/lotto-result";
import {splitDateTime} from "./split-date-time";

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

export const getSavedLottoDraw = (): SavedLottoResult | null => {
  const lotResultSaved = localStorage.getItem('lottoresult');
  return lotResultSaved ? JSON.parse(lotResultSaved) : null;
};

export const setLocalLotResult = (lotResult: LottoResult) => {
  localStorage.setItem("lottoresult", JSON.stringify({
    dateSaved: splitDateTime(new Date()),
    result: lotResult
  }));
};
