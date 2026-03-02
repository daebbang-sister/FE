import { Address } from "packages/types/src";

export type UserSignUp = {
  name: string;
  loginId: string;
  password: string;
  phoneNumber: string;
  email: string;
  address: Address;
};
