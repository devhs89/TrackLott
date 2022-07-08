import {environment as e} from "../../environments/environment";

export const endRoute = {
  accountRegister: `${e.baseUrl}/account/register`,
  accountLogin: `${e.baseUrl}/account/login`,
  accountShow: `${e.baseUrl}/account/show`,
  accountUpdate: `${e.baseUrl}/account/update-info`,
  updatePassword: `${e.baseUrl}/account/update-password`,
  latestLotto: `${e.baseUrl}/lottoResult/latest`,
  comboAdd: `${e.baseUrl}/combination/add`,
  matchCombos: `${e.baseUrl}/combination/match-combos`
};
