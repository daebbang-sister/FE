export const ORDER_LIST_STATUS_BUTTON = {
  ORDER_READY: [{ label: "주문취소", type: "cancel-all" }],
  PAID: [{ label: "주문취소", type: "cancel-all" }],
  PREPARING_DELIVERY: [{ label: "주문취소", type: "cancel-all" }],

  SHIPPING: [{ label: "배송 조회", type: "delivery" }],

  DELIVERED: [
    { label: "구매확정", type: "confirm" },
    { label: "교환 / 반품 신청", type: "return-exchange" },
  ],

  CANCELLED: [],

  RETURN_REQUESTED: [{ label: "환불 취소", type: "return-cancel" }],
  RETURN_PICKUP: [],
  RETURN_COMPLETED: [],

  REFUNDED: [],

  EXCHANGE_REQUESTED: [{ label: "교환 / 반품 신청", type: "return-exchange" }],
  EXCHANGE_REDELIVERY: [{ label: "배송 조회", type: "delivery" }],
} as const;

export const ORDER_DETAIL_STATUS_BUTTON = {
  // NORMAL은 또 뭐야?? [미정]
  NORMAL: [
    { label: "구매확정", type: "confirm" },
    { label: "주문취소", type: "cancel" },
    // { label: "교환 / 반품 신청", type: "return-exchange" },
  ],

  ORDER_READY: [{ label: "주문취소", type: "cancel" }],
  PAID: [{ label: "주문취소", type: "cancel" }],
  PREPARING_DELIVERY: [],
  SHIPPING: [],
  DELIVERED: [
    { label: "구매확정", type: "confirm" },
    { label: "교환 / 반품 신청", type: "return-exchange" },
  ],
  // 구매확정 상태 : ["리뷰작성"],

  CANCELLED: [],

  RETURN_REQUESTED: [{ label: "환불 취소", type: "return-cancel" }],
  RETURN_PICKUP: [],
  RETURN_COMPLETED: [],
  REFUNDED: [],

  EEXCHANGE_REQUESTED: [{ label: "교환 / 반품 신청", type: "return-exchange" }],
  EXCHANGE_REDELIVERY: [],
} as const;
