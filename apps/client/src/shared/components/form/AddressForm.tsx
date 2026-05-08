"use client";

import {
  deleteAddressAPI,
  getUserAddressAPI,
  postAddressAPI,
  updateAddressAPI,
} from "@/features/mypage/api";
import { UserAdressList } from "@/features/mypage/model";
import { Button } from "@repo/ui";
import { useEffect, useMemo, useState } from "react";
import PageLoading from "@/shared/components/layout/PageLoading";
import { ApiError } from "@/shared/lib/error";
import AddressModal from "@/shared/components/modal/AddressModal";
import { AddressFormValues } from "@/shared/schemas/address-form.schema";

export default function AddressForm() {
  // modal
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<UserAdressList | null>(
    null
  );
  const handleCloseOptionModal = () => {
    setIsOptionModalOpen(false);
    setSelectedAddress(null);
  };
  const handleConfirmOption = async (values: AddressFormValues) => {
    try {
      if (selectedAddress) {
        await updateAddressAPI(selectedAddress.addressId, values);
        // alert("배송지가 수정되었습니다.");
      } else {
        await postAddressAPI(values);
        // alert("배송지가 등록되었습니다.");
      }
      await fetchUserAddress();
      handleCloseOptionModal();
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      } else {
        alert("배송지 등록 중 오류가 발생했습니다.");
      }
    }
  };
  // #####

  const [addressList, setAddressList] = useState<UserAdressList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchUserAddress = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await getUserAddressAPI();
      setAddressList(res);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserAddress();
  }, []);
  const sortedAddressList = useMemo(() => {
    return [...addressList].sort(
      (a, b) => Number(b.isDefault) - Number(a.isDefault)
    );
  }, [addressList]);

  const fetchDeleteAddress = async (addressId: number) => {
    if (addressList.length <= 1) {
      alert("배송지는 최소 1개 이상 등록되어 있어야 합니다.");
      return;
    }
    const conf = confirm("선택한 배송지를 삭제 하시겠습니까?");
    if (!conf) {
      return;
    }
    try {
      await deleteAddressAPI(addressId);
      setAddressList((prev) =>
        prev.filter((item) => item.addressId !== addressId)
      );
      alert("배송지가 삭제되었습니다.");
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <section>
        <div className="flex items-center justify-between border-b border-neutral-300 py-3">
          <p className="body1">주소</p>
          <Button
            type="button"
            variant={"black"}
            className="w-auto"
            onClick={() => {
              setSelectedAddress(null);
              setIsOptionModalOpen(true);
            }}
          >
            배송지 추가
          </Button>
        </div>

        {isLoading ? (
          <PageLoading />
        ) : isError ? (
          <p>배송지 정보를 불러오지 못했습니다.</p>
        ) : addressList.length === 0 ? (
          <div className="text-text-disabled body1 flex h-full items-center justify-center border-b border-neutral-300 py-20">
            등록된 배송지가 없습니다.
          </div>
        ) : (
          <ul>
            {sortedAddressList.map((item) => (
              <li
                key={item.addressId}
                className="flex flex-col gap-4 border-b border-neutral-300 py-6"
              >
                <p className="body1">
                  <span className="font-bold">
                    {item.receiver}({item.alias || "미정"}){" "}
                  </span>
                  {item.isDefault && (
                    <span className="caption2 text-text-disabled rounded-full bg-neutral-200 px-1 py-0.5">
                      기본
                    </span>
                  )}
                </p>
                <div className="flex flex-col gap-1">
                  <p className="body2">
                    ({item.zipCode}) {item.address}
                    {item.detailAddress}
                  </p>
                  <p className="text-text-disabled body2">
                    {item.receiverPhoneNumber}
                  </p>
                </div>
                <div className="flex justify-end gap-2 [&>button]:w-auto">
                  <Button
                    type="button"
                    onClick={() => {
                      setSelectedAddress(item);
                      setIsOptionModalOpen(true);
                    }}
                  >
                    수정
                  </Button>
                  {!item.isDefault && (
                    <Button
                      type="button"
                      variant={"gray"}
                      onClick={() => fetchDeleteAddress(item.addressId)}
                    >
                      삭제
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <AddressModal
        isOpen={isOptionModalOpen}
        onClose={handleCloseOptionModal}
        defaultValues={selectedAddress}
        onConfirmOption={handleConfirmOption}
      />
    </>
  );
}
