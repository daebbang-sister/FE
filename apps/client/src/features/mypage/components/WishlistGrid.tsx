"use client";

import { CheckBox } from "@repo/ui";
import WishlistCard from "./WishlistCard";
import {
  useAllDeleteWishlist,
  useDeleteWishlist,
  useGetWishlist,
} from "@/features/mypage/hook/useWishlist";
import PageLoading from "@/shared/components/layout/PageLoading";
import { useMemo, useState } from "react";
import { PageLinkButton } from "@/shared/ui/button/PageLinkButton";
import { useSearchParams } from "next/navigation";
import { getProductOptions } from "@/features/cart/api";

export default function WishlistGrid() {
  const query = useSearchParams();
  const apiPage = Number(query.get("page") ?? "0");
  const pageSize = 12;
  const currentPage = apiPage + 1;
  const searchParamsObj = Object.fromEntries(query.entries());

  const {
    data,
    isLoading: isWishlistLoading,
    error: wishlistError,
    refetch,
  } = useGetWishlist(apiPage, pageSize);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const allWishListIds = useMemo(
    () => data?.content.map((item) => item.wishListId) ?? [],
    [data]
  );

  const isAllChecked =
    allWishListIds.length > 0 &&
    allWishListIds.every((id) => selectedIds.includes(id));

  const handleCheckedChange = (wishListId: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, wishListId] : prev.filter((id) => id !== wishListId)
    );
  };

  const handleAllCheckedChange = (checked: boolean) => {
    if (checked) {
      setSelectedIds(allWishListIds);
      return;
    }
    setSelectedIds([]);
  };

  const {
    deleteWishlist,
    // isLoading: isDeleteLoading,
    // error: deleteError,
  } = useDeleteWishlist(selectedIds);

  const handleDelete = async () => {
    try {
      const deleted = await deleteWishlist();
      if (!deleted) return;
      await refetch();
      setSelectedIds([]);
      alert("선택한 위시리스트의 상품을 삭제했습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  const {
    allDeleteWishlist,
    // isLoading: isAllDeleteLoading,
    // error: allDeleteError,
  } = useAllDeleteWishlist();

  const handleAllDelete = async () => {
    try {
      const allDeleted = await allDeleteWishlist();
      if (!allDeleted) return;
      await refetch();
      setSelectedIds([]);
      alert("모든 위시리스트의 상품을 삭제했습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductOptions = async (id: number) => {
    try {
      const options = await getProductOptions(id);
      console.log("옵션 데이터:", options);
    } catch (error) {
      console.error("옵션 조회 실패:", error);
    }
  };

  if (isWishlistLoading) return <PageLoading />;
  if (wishlistError) return <div>{wishlistError}</div>;
  if (!data || data.content.length === 0) {
    return (
      <div className="text-text-disabled body1 flex h-full items-center justify-center">
        찜해둔 상품이 없습니다.
      </div>
    );
  }

  return (
    <>
      <article className="border-text-primary body2 mb-4 flex items-center justify-between border-b py-4">
        <div className="flex items-center gap-3">
          <CheckBox
            id="allWishList"
            checked={isAllChecked}
            onChange={(e) => handleAllCheckedChange(e.target.checked)}
          />
          <label htmlFor="allWishList" className="cursor-pointer">
            전체 선택
          </label>
        </div>

        <ul className="text-text-disabled flex items-center gap-3">
          <li
            className="hover:text-text-primary cursor-pointer"
            onClick={handleDelete}
          >
            선택 삭제
          </li>
          <li
            className="hover:text-text-primary cursor-pointer"
            onClick={handleAllDelete}
          >
            전체 삭제
          </li>
        </ul>
      </article>

      <article className="grid grid-cols-2 gap-5 md:grid-cols-3">
        {data.content.map((product) => {
          return (
            <WishlistCard
              key={product.wishListId}
              wishListId={product.wishListId}
              productId={product.productId}
              productName={product.productName}
              mainImageUrl={product.mainImageUrl}
              originalPrice={`${product.originalPrice.toLocaleString()}원`}
              salePrice={
                product.discountRate !== null
                  ? `${product.sellingPrice.toLocaleString()}원`
                  : undefined
              }
              discount={
                product.discountRate !== null
                  ? `${product.discountRate}%`
                  : undefined
              }
              checked={selectedIds.includes(product.wishListId)}
              onCheckedChange={handleCheckedChange}
              onClickProduct={handleProductOptions}
            />
          );
        })}
      </article>

      <article className="flex justify-center pb-10">
        <PageLinkButton
          totalItems={data.totalElements}
          limit={pageSize}
          currentPage={currentPage}
          pageGroupSize={5}
          basePath={`/mypage/wish-list`}
          searchParams={searchParamsObj}
        />
      </article>

      {/* <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="알림"
        message={modalMessage}
      /> */}
    </>
  );
}
