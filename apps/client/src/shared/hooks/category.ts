// 카테고리 api연결 이전 임시
export const CATEGORIES = [
  { id: 1, name: "신상품", value: "new" },
  { id: 2, name: "실시간 베스트", value: "best" },
  { id: 3, name: "TOP", value: "top" },
  { id: 4, name: "BOTTOM", value: "bottom" },
  //   { id: 5, name: "트레이닝", value: "training" },
  //   { id: 6, name: "아우터", value: "outer" },
  //   { id: 7, name: "악세서리", value: "accessories" },
];

// value → id
export const getCategoryId = (value: string) => {
  return CATEGORIES.find((c) => c.value === value)?.id;
};

// value → name
export const getCategoryName = (value: string) => {
  return CATEGORIES.find((c) => c.value === value)?.name;
};
