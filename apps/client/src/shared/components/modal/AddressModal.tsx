"use client";
import SignUpInputLabel from "@/features/auth/components/SignUpInputLabel";
import { UserAdressList } from "@/features/mypage/model";
import { useKakaoPostcode } from "@/shared/hooks/useKakaoPostcode";
import {
  AddressFormValues,
  addressSchema,
} from "@/shared/schemas/address-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CheckBox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@repo/ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type AddressModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  defaultValues: UserAdressList | null;
  onClose: () => void;
  onConfirmOption: (values: AddressFormValues) => void;
};

export default function AddressModal({
  isOpen,
  isLoading = false,
  defaultValues,
  onClose,
  onConfirmOption,
}: AddressModalProps) {
  const { openPostcode } = useKakaoPostcode();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      receiver: "",
      receiverPhoneNumber: "",
      alias: "",
      zipCode: "",
      address: "",
      detailAddress: "",
      isDefault: false,
    },
  });
  const addressErrorMessage =
    errors.zipCode?.message ||
    errors.address?.message ||
    errors.detailAddress?.message;

  useEffect(() => {
    if (defaultValues) {
      reset({
        alias: defaultValues.alias ?? "",
        receiver: defaultValues.receiver,
        receiverPhoneNumber: defaultValues.receiverPhoneNumber,
        zipCode: defaultValues.zipCode,
        address: defaultValues.address,
        detailAddress: defaultValues.detailAddress,
        isDefault: defaultValues.isDefault,
      });
    } else {
      reset({
        receiver: "",
        alias: "",
        zipCode: "",
        address: "",
        detailAddress: "",
        receiverPhoneNumber: "",
        isDefault: false,
      });
    }
  }, [defaultValues, reset]);

  const isEditMode = !!defaultValues;
  const handleSearchAddress = () => {
    openPostcode((data) => {
      setValue("zipCode", data.zonecode, { shouldValidate: true });
      setValue("address", data.address, { shouldValidate: true });
    });
  };
  const handleConfirm = (values: AddressFormValues) => {
    onConfirmOption(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="w-full max-w-199">
        <ModalHeader title={isEditMode ? "배송지 수정" : "배송지 추가"} />
        <ModalBody>
          {isLoading ? (
            <p>로딩중</p>
          ) : (
            <form className="space-y-6 pt-4">
              <div>
                <SignUpInputLabel htmlFor="receiver" required={true}>
                  이름
                </SignUpInputLabel>
                <Input
                  id="receiver"
                  placeholder="받는 분 성함을 입력해 주세요."
                  {...register("receiver")}
                  status={errors.receiver ? "error" : "default"}
                  errorMessage={errors.receiver?.message}
                />
              </div>
              <div>
                <SignUpInputLabel htmlFor="receiverPhoneNumber" required={true}>
                  연락처
                </SignUpInputLabel>
                <Input
                  id="receiverPhoneNumber"
                  placeholder="숫자와 하이픈(-)을 함께 입력해 주세요."
                  {...register("receiverPhoneNumber")}
                  status={errors.receiverPhoneNumber ? "error" : "default"}
                  errorMessage={errors.receiverPhoneNumber?.message}
                />
              </div>
              <div>
                <SignUpInputLabel htmlFor="alias">배송지명</SignUpInputLabel>
                <Input
                  id="alias"
                  placeholder="배송지 별칭을 입력하세요."
                  {...register("alias")}
                />
              </div>
              <div>
                <SignUpInputLabel htmlFor="address" required={true}>
                  주소
                </SignUpInputLabel>
                <div className="mb-3 flex gap-2.5">
                  <Input
                    id="address"
                    status="disabled"
                    {...register("zipCode")}
                  />
                  <Button
                    type="button"
                    className="max-w-22.5"
                    variant="black"
                    onClick={handleSearchAddress}
                  >
                    주소조회
                  </Button>
                </div>
                <Input
                  className="mb-3"
                  id="address"
                  status="disabled"
                  {...register("address")}
                />
                <Input
                  id="detailAddress"
                  placeholder="상세 주소를 입력해 주세요."
                  {...register("detailAddress")}
                  status={addressErrorMessage ? "error" : "default"}
                  errorMessage={addressErrorMessage}
                />
              </div>
              <div className="flex items-center gap-1.5">
                <CheckBox id="default" {...register("isDefault")} />
                <label htmlFor="default">기본 배송지로 설정</label>
              </div>
            </form>
          )}
        </ModalBody>

        <ModalFooter>
          <div className="flex justify-end gap-2.5 md:[&>button]:w-38.75">
            <Button variant="stroke" onClick={onClose}>
              취소
            </Button>
            <Button variant="gray" onClick={handleSubmit(handleConfirm)}>
              {isEditMode ? "수정" : "등록"}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
