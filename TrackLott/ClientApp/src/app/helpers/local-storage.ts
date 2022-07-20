import {splitDateTime} from "./split-date-time";
import {LottoResult, SavedLottoResult} from "../models/latest-lotto-result.model";
import {WebTokenModel} from "../models/web-token.model";

export const setLocalUserToken = (userToken: WebTokenModel) => {
  localStorage.setItem("user", JSON.stringify(userToken));
};

export const getLocalUserToken = () => {
  return localStorage.getItem("user");
};

export const removeLocalUserToken = () => {
  localStorage.removeItem("user");
};

export const setSessionUserToken = (userToken: WebTokenModel) => {
  sessionStorage.setItem("user", JSON.stringify(userToken));
};

export const getSessionUserToken = () => {
  return sessionStorage.getItem("user");
};

export const removeSessionUserToken = () => {
  sessionStorage.removeItem("user");
};

export const getSavedLotResult = (): SavedLottoResult | null => {
  const lotResultSaved = localStorage.getItem('lottoResult');
  return lotResultSaved ? JSON.parse(lotResultSaved) : null;
};

export const setLocalLotResult = (lotResult: LottoResult) => {
  localStorage.setItem("lottoResult", JSON.stringify({
    dateSaved: splitDateTime(new Date()),
    result: lotResult
  }));
};
