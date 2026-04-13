import { calculateOrderPrice } from "@/features/product/utils/productPrice";
import { describe, expect, it } from "vitest";

describe("calculateOrderPrice", () => {
  it("할인이 있을 때 sellingPrice 기준으로 총 금액을 계산한다", () => {
    const result = calculateOrderPrice({
      originalPrice: 10000,
      sellingPrice: 8000,
      discountRate: 20,
      quantity: 2,
      savingPercent: 5,
    });

    expect(result.hasDiscount).toBe(true);
    expect(result.totalPrice).toBe(16000);
    expect(result.totalSalePrice).toBe(4000);
    expect(result.savingPoint).toBe(800);
  });

  it("할인이 없을 때 originalPrice 기준으로 총 금액을 계산한다", () => {
    const result = calculateOrderPrice({
      originalPrice: 10000,
      sellingPrice: 8000,
      discountRate: 0,
      quantity: 2,
      savingPercent: 5,
    });

    expect(result.hasDiscount).toBe(false);
    expect(result.totalPrice).toBe(20000);
    expect(result.totalSalePrice).toBe(4000);
    expect(result.savingPoint).toBe(1000);
  });

  it("수량이 1개일 때도 정상 계산한다", () => {
    const result = calculateOrderPrice({
      originalPrice: 15000,
      sellingPrice: 12000,
      discountRate: 20,
      quantity: 1,
      savingPercent: 10,
    });

    expect(result.totalPrice).toBe(12000);
    expect(result.totalSalePrice).toBe(3000);
    expect(result.savingPoint).toBe(1200);
  });

  it("적립금은 소수점이면 버림 처리한다", () => {
    const result = calculateOrderPrice({
      originalPrice: 9990,
      sellingPrice: 9990,
      discountRate: 0,
      quantity: 1,
      savingPercent: 5,
    });

    expect(result.savingPoint).toBe(499);
  });
});
