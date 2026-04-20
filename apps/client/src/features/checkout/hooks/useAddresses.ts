// features/checkout/hooks/useAddresses.ts
import { fetchAddresses } from "@/features/checkout/api";
import { Address } from "@/features/checkout/model";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

export const useAddresses = (setValue: UseFormSetValue<any>) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedAddress, setTempSelectedAddress] =
    useState<Address | null>(null);

  useEffect(() => {
    const fetchAddressesData = async () => {
      try {
        // const data = await fetchAddresses();
        // 임시 주소 데이터
        const data: Address[] = [
          {
            addressId: 1,
            alias: "집",
            receiver: "홍길동",
            receiverPhoneNumber: "01012345678",
            zipCode: "06236",
            address: "서울특별시 강남구 테헤란로 152",
            detailAddress: "101호",
            isDefault: true,
          },
          {
            addressId: 2,
            alias: "제주",
            receiver: "홍길동",
            receiverPhoneNumber: "01012345678",
            zipCode: "63085",
            address: "제주특별자치도 제주시 첨단로 242",
            detailAddress: "202호",
            isDefault: false,
          },
        ];
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
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleConfirmAddress = (callback: (address: Address) => void) => {
    if (!tempSelectedAddress) return;
    callback(tempSelectedAddress);
    handleCloseModal();
  };

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
