import ServerError from "../errors/serverError";

export const testError = (number: number) => {
  if (number >= 10) return "the number is BIGGER than 10";
  throw new ServerError(309, "the number is SMALLER than 10");
};
