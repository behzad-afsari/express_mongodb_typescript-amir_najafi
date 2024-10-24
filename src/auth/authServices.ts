import userModel from "../models/userModel";

import loginDto from "./dtos/loginUserDto";
import { encodeToken, decodeToken } from "../utils/userToken";

export const userLoginService = async (data: loginDto) => {
  const userFound = await userModel.findOne({ email: data.email });
  if (userFound && userFound.id) {
    const token = encodeToken({ id: userFound.id });
    return { token, id: userFound.id };
  } else {
    throw new Error("user not found.");
  }
};

export const userRegiseterService = () => {
  return "User Regiseter Service";
};
