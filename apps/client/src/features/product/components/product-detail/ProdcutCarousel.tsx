"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type ProductGallery = {
  imageUrl: string;
  imageOrder: number;
};

type Props = {
  mainImages: string;
  gallery: ProductGallery[];
};

export default function ProductCarousel({ mainImages, gallery }: Props) {
  const validImages = useMemo(() => {
    const galleryImages = [...gallery]
      .sort((a, b) => a.imageOrder - b.imageOrder)
      .map((item) => item.imageUrl);

    return [mainImages, ...galleryImages].filter(Boolean);
  }, [gallery, mainImages]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainImageLoading, setMainImageLoading] = useState(true);
  const [thumbLoading, setThumbLoading] = useState<Record<number, boolean>>({});

  const isSlide = validImages.length > 4;

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
  });

  if (validImages.length === 0) return null;

  const handleThumbLoad = (index: number) => {
    setThumbLoading((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  const handleThumbStart = (index: number) => {
    setThumbLoading((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const Thumbnail = (image: string, index: number) => {
    const isLoading = thumbLoading[index] !== false;
    const isSelected = selectedIndex === index;
    return (
      <button
        key={`${image}-${index}`}
        type="button"
        onClick={() => setSelectedIndex(index)}
        className={`relative aspect-square overflow-hidden ${
          isSlide ? "shrink-0 basis-1/4" : ""
        } ${!isSelected && !isLoading ? "border-neutral-200 opacity-40" : ""}`}
      >
        {thumbLoading[index] !== false && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="animate-shimmer h-full w-full bg-neutral-100" />
          </div>
        )}

        <Image
          src={image}
          alt={`썸네일 ${index + 1}`}
          fill
          className={`object-cover transition-opacity duration-300 ${
            thumbLoading[index] !== false ? "opacity-0" : "opacity-100"
          }`}
          onLoadStart={() => handleThumbStart(index)}
          onLoad={() => handleThumbLoad(index)}
        />
      </button>
    );
  };

  return (
    <section className="w-full max-w-full lg:max-w-194">
      {/* 메인 이미지 */}
      <div className="relative mb-2.5 aspect-4/5 w-full overflow-hidden bg-neutral-100">
        {mainImageLoading && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="animate-shimmer h-full w-full bg-neutral-100" />
          </div>
        )}

        <Image
          src={validImages[selectedIndex]}
          alt={`상품 이미지 ${selectedIndex + 1}`}
          fill
          priority
          className={`object-cover transition-opacity duration-500 ${
            mainImageLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setMainImageLoading(false)}
        />
      </div>

      {/* 썸네일 영역 */}
      {isSlide ? (
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-1.25">
            {validImages.map((image, index) => Thumbnail(image, index))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-1.25">
          {validImages.map((image, index) => Thumbnail(image, index))}
        </div>
      )}
    </section>
  );
}
