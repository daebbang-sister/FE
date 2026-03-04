import { Address } from "packages/types/src";

export type UserLogin = {
  id: string;
  password: string;
};

export type UserSignUp = {
  name: string;
  loginId: string;
  password: string;
  phoneNumber: string;
  email: string;
  address: Address;
};

export type UserFindId = {
  username: string;
  userEmail: string;
};

export type FindIdResponse = {
  userIds: {
    id: string;
    provider: string;
  }[];
};

export type UserFindPw = {
  userId: string;
  username: string;
  userEmail: string;
};

export type PhoneNumber = {
  phoneNumber: string;
};

export type PhoneVerify = PhoneNumber & {
  authCode: string;
};
