import { fetchUpdateCart } from "@/features/cart/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCartOption(loadCart: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartId,
      quantity,
      productDetailsId,
    }: {
      cartId: number;
      quantity: number;
      productDetailsId: number;
    }) => fetchUpdateCart(cartId, quantity, productDetailsId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      loadCart();
    },
  });
}
