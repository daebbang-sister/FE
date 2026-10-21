import { orderAllCancelAPI, orderCancelAPI } from "@/features/mypage/api";
import {
  ORDER_DETAIL_STATUS_BUTTON,
  ORDER_LIST_STATUS_BUTTON,
} from "@/features/mypage/utils/orderStatusButton";
import { Button } from "@repo/ui";
import { useRouter } from "next/navigation";

type OrderActionMode = "list" | "detail";
type Props = {
  mode: OrderActionMode;
  orderNumber: string;
  status: string;
  orderDetailId?: number;
  refetch?: () => Promise<void>;
};
export default function OrderActionButtons({
  mode,
  orderNumber,
  status,
  orderDetailId,
  refetch,
}: Props) {
  const router = useRouter();
  const buttonMap =
    mode === "list" ? ORDER_LIST_STATUS_BUTTON : ORDER_DETAIL_STATUS_BUTTON;
  const buttons = buttonMap[status as keyof typeof buttonMap] ?? [];

  const fetchOrderCancel = async () => {
    if (!orderDetailId) return;
    const conf = confirm(
      "해당 상품 주문을 취소하시겠습니까?\n취소 요청 후 관리자 승인 완료 시 환불이 진행됩니다.\n환불 처리는 영업일 기준 1일 이내 완료됩니다."
    );
    if (!conf) {
      return;
    }
    try {
      await orderCancelAPI(orderNumber, orderDetailId, "단순변심");
      await refetch?.();
      alert("주문 취소 요청이 완료되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrderAllCancel = async () => {
    const conf = confirm(
      "전체 주문을 취소하시겠습니까?\n취소 요청 후 관리자 승인 완료 시 환불이 진행됩니다.\n환불 처리는 영업일 기준 1일 이내 완료됩니다."
    );
    if (!conf) {
      return;
    }
    try {
      await orderAllCancelAPI(orderNumber, "단순변심");
      await refetch?.();
      alert("주문 취소 요청이 완료되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleActionClick = async (actionType: string) => {
    switch (actionType) {
      case "cancel":
        await fetchOrderCancel();
        break;

      case "cancel-all":
        await fetchOrderAllCancel();
        break;

      case "return-exchange":
        router.push(`/mypage/orders/${orderNumber}/refund`);
        break;

      case "review":
        // 모달 오픈
        alert("리뷰모달");
        break;

      case "confirm":
        alert("구매 확정 : api 연결대기");
        break;

      case "return-cancel":
        alert("환불 취소 : api 연결대기");
        break;
    }
  };

  return (
    <div className="mt-3 flex justify-end gap-2">
      {buttons?.map((action) => (
        <Button
          key={`${action.type}-${orderDetailId ?? orderNumber}`}
          className="w-38.75"
          variant="gray"
          onClick={() => handleActionClick(action.type)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
