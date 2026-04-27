import {
  Button,
  CheckBox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@repo/ui";
import { Address } from "@/features/checkout/model";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { checkoutSchema } from "@/features/checkout/schemas/checkout.schema";

type FormData = z.infer<typeof checkoutSchema>;

type AddressModalProps = {
  isModalOpen: boolean;
  addresses: Address[];
  tempSelectedAddress: Address | null;
  setTempSelectedAddress: (address: Address) => void;
  handleCloseModal: () => void;
  handleConfirmAddress: (callback: (address: Address) => void) => void;
  setValue: UseFormSetValue<FormData>;
};

export default function CheckoutAddressModal({
  isModalOpen,
  addresses,
  tempSelectedAddress,
  setTempSelectedAddress,
  handleCloseModal,
  handleConfirmAddress,
  setValue,
}: AddressModalProps) {
  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent className="w-full max-w-3xl">
        <ModalHeader title="배송지 목록" />
        <ModalBody>
          <div>
            <div className="mb-3 flex items-center justify-between">
              {addresses ? <b>주소를 등록해주세요</b> : <p>주소</p>}
              <Button variant="black" type="button" className="w-22.5">
                주소 등록
              </Button>
            </div>
            <div className="flex max-h-40 flex-col gap-3 overflow-y-auto">
              {addresses.map((address) => (
                <div
                  key={address.addressId}
                  className="border-border-default border-b pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      <b>{address.alias}</b>
                      {address.isDefault === true && (
                        <span className="text-text-disabled caption2 bg-neutral-200 p-0.75">
                          기본배송지
                        </span>
                      )}
                    </div>
                    <div>
                      <CheckBox
                        id={`address-${address.addressId}`}
                        checked={
                          tempSelectedAddress?.addressId === address.addressId
                        }
                        onChange={() => setTempSelectedAddress(address)}
                      />
                    </div>
                  </div>
                  <div className="my-4">
                    <p>
                      {address.address} {address.detailAddress}
                    </p>
                    <p className="text-text-disabled mt-1.5">
                      {address.receiverPhoneNumber}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2.5">
                    <Button variant="stroke" type="button" className="w-fit">
                      수정
                    </Button>
                    <Button variant="gray" type="button" className="w-fit">
                      삭제
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="flex items-center justify-end gap-2.5">
          <Button
            type="button"
            onClick={handleCloseModal}
            variant="stroke"
            className="w-full max-w-38.75"
          >
            취소
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (!tempSelectedAddress) {
                handleCloseModal();
                return;
              }

              handleConfirmAddress((address) => {
                setValue("selectedAddressId", address.addressId);
              });
            }}
            variant="gray"
            className="w-full max-w-38.75"
          >
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
