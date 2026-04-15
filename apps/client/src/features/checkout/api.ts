import { Address } from "@/features/checkout/model";
import request from "@/shared/lib/request";

export const fetchAddresses = () =>
  request<Address[]>("/v1/addresses", { method: "GET" });
