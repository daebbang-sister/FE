import { CheckBox } from "@repo/ui";
import { useCheckoutAgree } from "@/features/checkout/hooks/useCheckoutAgree";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { checkoutSchema } from "@/features/checkout/schemas/checkout.schema";
import { z } from "zod";

type FormData = z.infer<typeof checkoutSchema>;

type CheckoutAgreeProps = {
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
  errors: FieldErrors<FormData>;
};

export default function CheckoutAgree({
  setValue,
  watch,
  errors,
}: CheckoutAgreeProps) {
  const { agreePrivacy, agreeOrder, allAgreeChecked, handleAllAgreeChecked } =
    useCheckoutAgree({ setValue, watch });

  return (
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
        <div className="flex items-start gap-0.75">
          <CheckBox
            id="agree-privacy"
            checked={agreePrivacy}
            onChange={(e) =>
              setValue("agreePrivacy", e.target.checked, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          />
          <div>
            <label htmlFor="agree-privacy">
              개인정보처리방침 약관 동의 [필수]
            </label>

            {errors.agreePrivacy?.message && (
              <p className="caption1 text-danger-200 mt-1">
                {errors.agreePrivacy.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-start gap-0.75">
          <CheckBox
            id="agree-order"
            checked={agreeOrder}
            onChange={(e) =>
              setValue("agreeOrder", e.target.checked, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          />

          <div>
            <label htmlFor="agree-order" className="leading-4">
              주문 약관 동의 [필수]
            </label>

            <p className="caption1-loose text-text-disabled">
              주문하는 상품의 상품명, 상품가격, 상품수량, 배송정보, 적립금 사용
              등 주문 정보를 확인하였으며, 결제 및 서비스 이용 약관에
              동의합니다.
            </p>

            {errors.agreeOrder?.message && (
              <p className="caption1 text-danger-200 mt-1">
                {errors.agreeOrder.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
