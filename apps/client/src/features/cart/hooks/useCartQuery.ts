import { fetchCart } from "@/features/cart/api";
import { useQuery } from "@tanstack/react-query";

export const useCartQuery = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart({ size: 8 }),
    select: (data) =>
      data.data.carts.map((item) => ({
        ...item,
        checked: true,
      })),
  });
};
