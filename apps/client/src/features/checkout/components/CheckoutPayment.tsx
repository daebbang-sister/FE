import { Button, Dropdown, Input, TabButton } from "@repo/ui";
import { bankOptions } from "@/features/checkout/constants/bankOptions";
import { useCheckoutPaymentMethod } from "@/features/checkout/hooks/useCheckoutPaymentMethod";
import { UseFormSetValue, FieldErrors, UseFormRegister } from "react-hook-form";
import { checkoutSchema } from "@/features/checkout/schemas/checkout.schema";
import { z } from "zod";

type FormData = z.infer<typeof checkoutSchema>;

type CheckoutPaymentProps = {
  setValue: UseFormSetValue<FormData>;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export default function CheckoutPayment({
  setValue,
  register,
  errors,
}: CheckoutPaymentProps) {
  const { tabIndex, selectedProvider, setSelectedProvider, handleTabChange } =
    useCheckoutPaymentMethod(setValue);

  return (
    <div>
      <h6 className="title3 mb-6">결제 정보 선택</h6>
      <TabButton
        tabs={["카드 결제", "계좌이체"]}
        size="M"
        className="w-full"
        onChange={handleTabChange}
      />
      <div className={tabIndex === 0 ? "block" : "hidden"}>
        <div className="mt-6 grid grid-cols-3 gap-2.5">
          <Button
            type="button"
            variant={selectedProvider === "toss" ? "black" : "gray"}
            onClick={() => setSelectedProvider("toss")}
          >
            토스페이
          </Button>
        </div>
        <div key="payment-method" id="payment-method" />
        <div key="agreement" id="agreement" />
      </div>
      {tabIndex === 1 && (
        <div className="mt-6 flex flex-col gap-6">
          <div>
            <label htmlFor="deposit-bank">입금은행</label>
            <Dropdown
              className="mt-3"
              id="deposit-bank"
              placeholder="입금은행을 선택해주세요."
              options={bankOptions}
              onChange={(value) => {
                setValue("bank", value, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />
            {errors.bank?.message && (
              <p className="caption1 text-danger-200 mt-1">
                {errors.bank?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="depositor-name">입금자명</label>
            <Input
              {...register("depositorName")}
              id="depositor-name"
              placeholder="입금자명을 입력해주세요."
              helperMessage="24시간 이내 미입금 시 자동 취소됩니다."
              errorMessage={errors.depositorName?.message}
            />
          </div>
        </div>
      )}
    </div>
  );
}
