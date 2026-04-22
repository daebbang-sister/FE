import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
const CLIENT_KEY = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export const initTossWidgets = async (amount: number) => {
  const tossPayments = await loadTossPayments(CLIENT_KEY);
  const widgets = tossPayments.widgets({
    customerKey: ANONYMOUS,
  });
  await widgets.setAmount({ currency: "KRW", value: amount });
  return widgets;
};
