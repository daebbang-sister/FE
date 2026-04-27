// features/checkout/hooks/useAddresses.ts
import { fetchAddresses } from "@/features/checkout/api";
import { Address } from "@/features/checkout/model";
import { checkoutSchema } from "@/features/checkout/schemas/checkout.schema";
import { useCallback, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof checkoutSchema>;

export const useAddresses = (setValue: UseFormSetValue<FormData>) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedAddress, setTempSelectedAddress] =
    useState<Address | null>(null);

  useEffect(() => {
    const fetchAddressesData = async () => {
      try {
        const data = await fetchAddresses();

        setAddresses(data);
        const defaultAddress = data.find((a) => a.isDefault);
        if (defaultAddress) {
          setValue("selectedAddressId", defaultAddress.addressId);
        }
      } catch (error) {
        console.error("주소 조회 실패", error);
      }
    };
    fetchAddressesData();
  }, [setValue]);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleConfirmAddress = useCallback(
    (callback: (address: Address) => void) => {
      if (!tempSelectedAddress) return;
      callback(tempSelectedAddress);
      setIsModalOpen(false);
    },
    [tempSelectedAddress]
  );

  return {
    addresses,
    isModalOpen,
    tempSelectedAddress,
    setTempSelectedAddress,
    handleOpenModal,
    handleCloseModal,
    handleConfirmAddress,
  };
};
