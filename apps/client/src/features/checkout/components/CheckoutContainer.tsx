"use client";

import { useTossWidgets } from "@/features/checkout/hooks/useTossWidgets";
import { useAddresses } from "@/features/checkout/hooks/useAddresses";
import { checkoutSchema } from "@/features/checkout/schemas/checkout.schema";
import { useCheckoutStore } from "@/features/checkout/store/checkout.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";
import { useCheckoutPayment } from "@/features/checkout/hooks/useCheckoutPayment";
import { useCheckoutPrice } from "@/features/checkout/hooks/useCheckoutPrice";
import CheckoutSummary from "@/features/checkout/components/CheckoutSummary";
import CheckoutPoints from "@/features/checkout/components/CheckoutPoints";
import CheckoutAgree from "@/features/checkout/components/CheckoutAgree";
import CheckoutPayment from "@/features/checkout/components/CheckoutPayment";
import CheckoutShipping from "@/features/checkout/components/CheckoutShipping";
import CheckoutItems from "@/features/checkout/components/CheckoutItems";
import CheckoutAddressModal from "@/features/checkout/components/CheckoutAddressModal";
import CheckoutNotice from "@/features/checkout/components/CheckoutNotice";

type FormData = z.infer<typeof checkoutSchema>;

export default function CheckoutContainer() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      selectedAddressId: 0,
      shipRequest: "",
      paymentMethod: "card",
      usedPoints: 0,
      agreePrivacy: false,
      agreeOrder: false,
    },
  });

  const {
    addresses,
    isModalOpen,
    tempSelectedAddress,
    setTempSelectedAddress,
    handleOpenModal,
    handleCloseModal,
    handleConfirmAddress,
  } = useAddresses(setValue);
  const selectedAddressId = useWatch({
    control,
    name: "selectedAddressId",
  });
  const defaultAddress = addresses.find((a) => a.isDefault);
  const selectedAddress =
    addresses.find((address) => address.addressId === selectedAddressId) ??
    defaultAddress ??
    undefined;
  const shipRequest = watch("shipRequest");
  const usedPoints = watch("usedPoints");
  const inputRef = useRef<HTMLInputElement>(null);
  const checkoutItems = useCheckoutStore((s) => s.items);
  const { totalPrice, shippingFee, totalPayment, savingPoint } =
    useCheckoutPrice({
      checkoutItems,
      selectedAddress,
      usedPoints,
    });

  const { widgetsRef } = useTossWidgets(totalPayment);
  const { requestPayment } = useCheckoutPayment({
    widgetsRef,
    checkoutItems,
    selectedAddress,
    usedPoints,
  });

  useEffect(() => {
    if (shipRequest === "직접 입력") {
      inputRef.current?.focus();
    }
  }, [shipRequest]);

  useEffect(() => {
    if (!selectedAddressId && defaultAddress) {
      setValue("selectedAddressId", defaultAddress.addressId);
    }
  }, [selectedAddressId, defaultAddress, setValue]);

  useEffect(() => {
    if (!isModalOpen) return;
    setTempSelectedAddress(selectedAddress ?? null);
  }, [isModalOpen, selectedAddress]);

  const onSubmit = async (data: FormData) => {
    if (data.paymentMethod === "card") {
      await requestPayment();
      return;
    }

    if (data.paymentMethod === "bank") {
      return;
    }
  };

  return (
    <div className="page-y container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-screen flex-col items-start justify-between xl:flex-row xl:gap-13.5"
      >
        {/* 왼쪽 */}
        <div className="flex w-full flex-1 flex-col gap-12 xl:min-w-0">
          {/* 배송정보 */}
          <CheckoutShipping
            selectedAddress={selectedAddress}
            addresses={addresses}
            shipRequest={shipRequest}
            setValue={setValue}
            register={register}
            errors={errors}
            handleOpenModal={handleOpenModal}
          />
          {/* 주문 상품 정보 */}
          <CheckoutItems />
          {/* 적립금 */}
          <CheckoutPoints setValue={setValue} watch={watch} />
          {/* 결제정보 */}
          <CheckoutPayment
            setValue={setValue}
            register={register}
            errors={errors}
          />
          {/* 약관동의 */}
          <CheckoutAgree setValue={setValue} watch={watch} errors={errors} />
          {/* pc 유의사항 */}
          <div className="hidden xl:block">
            <CheckoutNotice />
          </div>
        </div>

        {/* 오른쪽 */}
        <CheckoutSummary
          totalPrice={totalPrice}
          shippingFee={shippingFee}
          totalPayment={totalPayment}
          savingPoint={savingPoint}
          usedPoints={usedPoints}
        />

        {/* 모바일 유의사항 */}
        <div className="mt-12 block w-full xl:hidden">
          <CheckoutNotice />
        </div>
      </form>
      {/* 모달 */}
      <CheckoutAddressModal
        isModalOpen={isModalOpen}
        addresses={addresses}
        tempSelectedAddress={tempSelectedAddress}
        setTempSelectedAddress={setTempSelectedAddress}
        handleCloseModal={handleCloseModal}
        handleConfirmAddress={handleConfirmAddress}
        setValue={setValue}
      />
    </div>
  );
}
