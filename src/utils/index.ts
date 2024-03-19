import { jwtDecode } from "jwt-decode";
import { TUserState } from "../types";
export const decodeJwtToken = (token: string) => {
  console.log("decodeJwtToken", token);
  return jwtDecode<TUserState>(token);
};
