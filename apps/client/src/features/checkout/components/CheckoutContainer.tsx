"use client";

// import { fetchAddresses } from "@/features/checkout/api";
import { Address } from "@/features/checkout/model";
import { useCheckoutStore } from "@/features/checkout/store/checkout.store";
import {
  Button,
  CheckBox,
  Dropdown,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  TabButton,
} from "@repo/ui";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const shipRequestOptions = [
  { label: "배송 전에 미리 연락주세요.", value: "배송 전에 미리 연락주세요." },
  {
    label: "부재 시 경비실에 맡겨주세요.",
    value: "부재 시 경비실에 맡겨주세요.",
  },
  { label: "문 앞에 나두고 가주세요.", value: "문 앞에 나두고 가주세요." },
  { label: "택배함에 넣어주세요.", value: "택배함에 넣어주세요." },
  { label: "직접 입력", value: "직접 입력" },
];

export const bankOptions = [
  { label: "국민은행", value: "kookmin" },
  { label: "신한은행", value: "shinhan" },
  { label: "우리은행", value: "woori" },
  { label: "하나은행", value: "hana" },
  { label: "농협은행", value: "nh" },
  { label: "기업은행", value: "ibk" },
  { label: "카카오뱅크", value: "kakao" },
  { label: "토스뱅크", value: "toss" },
];

export default function CheckoutContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      addressId: 1,
      alias: "집",
      receiver: "홍길동",
      receiverPhoneNumber: "01012345678",
      zipCode: "12345",
      address: "서울시 강남구 테헤란로",
      detailAddress: "101호",
      isDefault: true,
    },
    {
      addressId: 2,
      alias: "회사",
      receiver: "홍길동",
      receiverPhoneNumber: "01087654321",
      zipCode: "67890",
      address: "서울시 서초구 강남대로",
      detailAddress: "202호",
      isDefault: false,
    },
  ]);
  const defaultAddress = addresses.find((a) => a.isDefault);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    defaultAddress ?? null
  );
  const [tempSelectedAddress, setTempSelectedAddress] =
    useState<Address | null>(selectedAddress);

  const [shipRequest, setShipRequest] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedBank, setSelectedBank] = useState("");
  const checkoutItems = useCheckoutStore((s) => s.items);
  const [availablePoints, setAvailablePoints] = useState(400);
  const [usedPoints, setUsedPoints] = useState(0);
  const [pointsInput, setPointsInput] = useState("");
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeOrder, setAgreeOrder] = useState(false);
  const allAgreeChecked = agreePrivacy && agreeOrder;
  const [depositorName, setDepositorName] = useState("");

  useEffect(() => {
    if (shipRequest === "직접 입력") {
      inputRef.current?.focus();
    }
  }, [shipRequest]);

  // useEffect(() => {
  //   const fetchAddressesData = async () => {
  //     try {
  //       const data = await fetchAddresses();
  //       setAddresses(data);
  //       const defaultAddress = data.find((a) => a.isDefault);
  //       setSelectedAddress(defaultAddress || null);
  //     } catch (error) {
  //       console.error("주소 조회 실패", error);
  //     }
  //   };
  //   fetchAddressesData();
  // }, []);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleUseAllPoints = () => {
    setUsedPoints(availablePoints);
    setPointsInput(String(availablePoints));
  };

  const handlePointsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Number(value) > availablePoints) {
      alert("보유 적립금을 초과할 수 없습니다.");
      return;
    }
    setUsedPoints(Number(value));
    setPointsInput(value);
  };

  const handleAllAgreeChecked = (checked: boolean) => {
    setAgreeOrder(checked);
    setAgreePrivacy(checked);
  };

  return (
    <div className="page-y container">
      <div className="flex min-h-screen items-start justify-between gap-13.5">
        {/* 왼쪽 */}
        <div className="flex flex-1 flex-col gap-12">
          {/* 배송정보 */}
          <div>
            <h6 className="title3 mb-6">배송정보</h6>
            {/* 위 */}
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
                    variant="black"
                    className="w-22.5"
                    onClick={() => {
                      setTempSelectedAddress(selectedAddress);
                      setIsModalOpen(true);
                    }}
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
                <b> 기본 배송지를 등록해주세요</b>
                <Button
                  variant="black"
                  className="w-22.5"
                  onClick={() => setIsModalOpen(true)}
                >
                  {addresses.length > 0 ? "변경" : "등록"}
                </Button>
              </div>
            )}
            {/* 아래 */}
            <div className="mt-6">
              <h6 className="mb-3">요청사항</h6>
              <Dropdown
                id="shipp-request"
                placeholder="요청사항을 선택해주세요."
                options={shipRequestOptions}
                onChange={(value) => {
                  setShipRequest(value);
                }}
              />
              <Input
                ref={inputRef}
                id="ship-request-custom"
                disabled={shipRequest !== "직접 입력"}
                placeholder="요청사항을 입력해주세요."
                className="mt-3"
              />
            </div>
          </div>
          {/* 배송정보 */}
          <div>
            <h6 className="title3 mb-6">주문 상품 정보</h6>
            <div className="flex flex-col gap-3">
              {checkoutItems.map((item) => (
                <div
                  key={item.cartId}
                  className="border-border-default flex gap-3 border p-4"
                >
                  <div className="relative h-25 w-25 overflow-hidden">
                    <Image
                      className="object-cover object-center"
                      fill
                      alt={item.productName}
                      src={item.mainImageUrl}
                    />
                  </div>
                  <div>
                    <h2>{item.productName}</h2>
                    <p className="text-text-disabled mt-3 mb-6">
                      {item.color} / {item.size} {item.quantity}개
                    </p>
                    {item.discountRate ? (
                      <b>{item.discountPrice}원</b>
                    ) : (
                      <b>{item.originalPrice}원</b>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 배송정보 */}
          <div>
            <h6 className="title3 mb-6">적립금</h6>
            <div className="mb-2.5 flex gap-2.5">
              <Input
                id="points-to-use"
                value={pointsInput}
                onChange={handlePointsInput}
              />
              <Button
                variant="black"
                className="w-22.5 shrink-0"
                onClick={handleUseAllPoints}
              >
                전체 사용
              </Button>
            </div>
            <p className="caption1 text-text-disabled">
              보유 적립금 : {availablePoints}
            </p>
          </div>
          {/* 배송정보 */}
          <div>
            <h6 className="title3 mb-6">결제 정보 선택</h6>
            <TabButton
              tabs={["카드 결제", "계좌이체"]}
              size="M"
              className="w-full"
              onChange={(index) => setTabIndex(index)}
            />
            {tabIndex === 0 && (
              <div className="mt-6 grid grid-cols-3 gap-2.5">
                <Button variant="gray">토스페이</Button>
              </div>
            )}
            {tabIndex === 1 && (
              <div className="mt-6 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <label htmlFor="deposit-bank">입금은행</label>
                  <Dropdown
                    id="shipp-request"
                    placeholder="입금은행을 선택해주세요."
                    options={bankOptions}
                    onChange={(value) => setSelectedBank(value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="depositor-name">입금자명</label>
                  <Input
                    id="depositor-name"
                    value={depositorName}
                    onChange={(e) => setDepositorName(e.target.value)}
                    placeholder="입금자명을 입력해주세요."
                    helperMessage="24시간 이내 미입금 시 자동 취소됩니다."
                  />
                </div>
              </div>
            )}
          </div>
          {/* 약관동의 */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h6 className="title3">약관 동의</h6>
              <div className="flex items-center justify-end gap-0.75">
                <CheckBox
                  id="agree-all"
                  checked={allAgreeChecked}
                  onChange={(e) => handleAllAgreeChecked(e.target.checked)}
                />
                <label htmlFor="agree-all">모든 약관 동의</label>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-0.75">
                <CheckBox
                  id="agree-privacy"
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                />
                <label htmlFor="agree-privacy">
                  개인정보처리방침 약관 동의 [필수]
                </label>
              </div>
              <div className="mt-3 flex items-start gap-0.75">
                <CheckBox
                  id="agree-order"
                  checked={agreeOrder}
                  onChange={(e) => setAgreeOrder(e.target.checked)}
                />
                <div>
                  <label htmlFor="agree-order" className="leading-4">
                    주문 약관 동의 [필수]
                  </label>
                  <p className="caption1-loose text-text-disabled">
                    주문하는 상품의 상품명, 상품가격, 상품수량, 배송정보, 적립금
                    사용 등 주문 정보를 확인하였으며, 결제 및 대빵언니에서
                    제공하는 이용 약관에 동의합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-neutral-100 p-4">
            <p className="caption2 mb-1.5">구매 시 유희사항</p>
            <ul>
              <li className="flex items-center gap-1.75">
                <span className="bg-text-disabled h-0.75 w-0.75"></span>
                <span className="text-text-disabled caption2-loose">
                  주문 상태가 ‘배송 준비’ 및 ‘배송 중’일 경우 취소 처리가
                  불가합니다.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 오른쪽 */}
        <div
          className="border-border-default sticky w-full max-w-112.5 self-start border px-7.5 py-10"
          style={{ top: "calc(var(--size-header-h) + 60px)" }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span>상품 합계 금액</span>
              {/* <span>{totalPrice.toLocaleString()}won</span> */}
            </div>
            <div className="flex justify-between">
              <span>배송비</span>
              {/* <span>{shippingFee.toLocaleString()}won</span> */}
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="caption1 text-text-disabled">
                ㄴ 기본택배비 3000 / 제주 산간·도서지역 6000
              </span>
              <span className="caption1 text-text-disabled">
                ㄴ 7만원 이상 배송비 무료, 14만원 이상 분리 배송 가능(카톡 문의)
              </span>
            </div>
            <div className="flex justify-between">
              <span>적립금</span>
              <span>{usedPoints}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="caption1 text-text-disabled">
                ㄴ 주문 시 예상 적립금 : 300
              </span>
            </div>
          </div>
          <div className="title3 border-text-primary mt-6 flex justify-between border-t pt-6">
            <span>결제 예상 금액</span>
            {/* <span>{totalPayment.toLocaleString()}won</span> */}
          </div>

          <div className="mt-9">
            <Button variant="gray" disabled={!allAgreeChecked}>
              결제하기
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent className="w-full max-w-3xl">
          <ModalHeader title="배송지 목록" />
          <ModalBody>
            <div>
              <div className="mb-3 flex items-center justify-between">
                <p>주소</p>
                <Button variant="black" className="w-22.5">
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
                      <Button variant="stroke" className="w-fit">
                        수정
                      </Button>
                      <Button variant="gray" className="w-fit">
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
              onClick={() => setIsModalOpen(false)}
              variant="stroke"
              className="w-full max-w-38.75"
            >
              취소
            </Button>
            <Button
              onClick={() => {
                setSelectedAddress(tempSelectedAddress);
                setIsModalOpen(false);
              }}
              variant="gray"
              className="w-full max-w-38.75"
            >
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
