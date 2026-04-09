import { getProductOptions } from "@/features/cart/api";
import { useQuery } from "@tanstack/react-query";

export default function useProductOptionsQuery(
  productId: number,
  isOpen: boolean
) {
  return useQuery({
    queryKey: ["productOptions", productId],
    queryFn: () => getProductOptions(productId),
    enabled: isOpen,
  });
}
