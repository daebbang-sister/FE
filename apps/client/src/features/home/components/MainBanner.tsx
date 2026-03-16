export const banners = [
  {
    id: 1,
    title: "BEST ITEM",
    image: "사진1",
  },
  {
    id: 2,
    title: "NEW ITEM",
    image: "사진2",
  },
  {
    id: 3,
    title: "TOP",
    image: "사진3",
  },
  {
    id: 4,
    title: "BOTTOM",
    image: "사진4",
  },
];

export default function MainBanner() {
  return (
    <div className="grid grid-cols-4 gap-x-5">
      {banners.map((banner) => (
        <div key={banner.id} className="relative">
          <div className="aspect-3/3.5 overflow-hidden bg-neutral-200">
            <div className="h-full w-full object-cover">이미지</div>
          </div>
          <p className="font-poppins text-neutral-0/65 absolute bottom-5 left-5 z-9 text-[32px] leading-none">
            {banner.title}
          </p>
        </div>
      ))}
    </div>
  );
}
