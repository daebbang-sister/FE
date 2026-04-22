import { Button, Dropdown, Input } from "@repo/ui";
import { shipRequestOptions } from "@/features/checkout/constants/shipRequestOptions";
import { useEffect, useRef } from "react";
import {
  UseFormSetValue,
  UseFormWatch,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { checkoutSchema } from "@/features/checkout/schemas/checkout.schema";
import z from "zod";
import { Address } from "@/features/checkout/model";

type FormData = z.infer<typeof checkoutSchema>;

type CheckoutShippingProps = {
  selectedAddress?: Address;
  addresses: Address[];
  shipRequest: string | undefined;
  setValue: UseFormSetValue<FormData>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  handleOpenModal: () => void;
};

export default function CheckoutShipping({
  selectedAddress,
  addresses,
  shipRequest,
  setValue,
  register,
  errors,
  handleOpenModal,
}: CheckoutShippingProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shipRequest === "직접 입력") {
      inputRef.current?.focus();
    }
  }, [shipRequest]);

  return (
    <div>
      <h6 className="title3 mb-6">배송정보</h6>
      {selectedAddress ? (
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              <p>{selectedAddress?.receiver}</p>
              <span className="text-text-disabled caption2 bg-neutral-200 p-0.75">
                {selectedAddress?.alias}
              </span>
            </div>
            <Button
              type="button"
              variant="black"
              className="w-22.5"
              onClick={handleOpenModal}
            >
              변경
            </Button>
          </div>
          <div className="body2 flex flex-col gap-1.5">
            <p>
              {selectedAddress?.address} {selectedAddress?.detailAddress}
            </p>
            <p className="text-text-disabled">
              {selectedAddress?.receiverPhoneNumber}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <b>기본 배송지를 등록해주세요</b>
          <Button
            type="button"
            variant="black"
            className="w-22.5"
            onClick={handleOpenModal}
          >
            {addresses.length > 0 ? "변경" : "등록"}
          </Button>
        </div>
      )}
      <div className="mt-6">
        <h6 className="mb-3">요청사항</h6>
        <Dropdown
          id="ship-request"
          placeholder="요청사항을 선택해주세요."
          options={shipRequestOptions}
          onChange={(value) => {
            setValue("shipRequest", value, {
              shouldDirty: true,
              shouldValidate: true,
            });

            if (value !== "직접 입력") {
              setValue("shipRequestCustom", "");
            }
          }}
        />
        {errors.shipRequest?.message && (
          <p className="caption1 text-danger-200 mt-1">
            {errors.shipRequest.message}
          </p>
        )}
        <Input
          {...register("shipRequestCustom")}
          ref={inputRef}
          id="ship-request-custom"
          disabled={shipRequest !== "직접 입력"}
          placeholder="요청사항을 입력해주세요."
          className="mt-3"
        />
      </div>
    </div>
  );
}
