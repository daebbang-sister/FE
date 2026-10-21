const ORDER_STATUS_MAP = {
  ORDER_READY: "입금 대기",
  PAID: "결제 완료",
  PREPARING_DELIVERY: "배송준비중",
  SHIPPING: "배송중",
  DELIVERED: "배송 완료",

  CANCELLED: "주문 취소",

  RETURN_REQUESTED: "반품 요청",
  RETURN_PICKUP: "회수중",
  RETURN_COMPLETED: "반품 완료",

  REFUNDED: "환불 완료",

  EXCHANGE_REQUESTED: "교환 요청",
  EXCHANGE_REDELIVERY: "교환 재배송",
} as const;

export function formatOrderStatus(status: string) {
  return ORDER_STATUS_MAP[status as keyof typeof ORDER_STATUS_MAP] ?? status;
}
