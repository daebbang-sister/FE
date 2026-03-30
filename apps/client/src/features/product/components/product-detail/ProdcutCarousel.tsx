"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type Props = {
  images: string[];
};

export default function ProdcutCarousel({ images }: Props) {
  const validImages = useMemo(() => images.filter(Boolean), [images]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isSlide = validImages.length > 4;

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
  });

  if (validImages.length === 0) return null;

  return (
    <section className="w-full max-w-full lg:max-w-194">
      {/* 메인 이미지 */}
      <div className="relative mb-2.5 aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <Image
          src={validImages[selectedIndex]}
          alt={`상품 이미지 ${selectedIndex + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* 썸네일 영역 */}
      {isSlide ? (
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-1.25">
            {validImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`relative shrink-0 basis-1/4 overflow-hidden border ${
                  selectedIndex === index
                    ? "border-black"
                    : "border-neutral-200 opacity-40"
                } aspect-[4/4]`}
              >
                <Image
                  src={image}
                  alt={`썸네일 ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-1.25">
          {validImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`relative overflow-hidden border ${
                selectedIndex === index
                  ? "border-black"
                  : "border-neutral-200 opacity-40"
              } aspect-[4/4]`}
            >
              <Image
                src={image}
                alt={`썸네일 ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
