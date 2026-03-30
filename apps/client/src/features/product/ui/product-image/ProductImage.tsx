import Image from "next/image";

type ProductImageProps = {
  primaryImage: string;
  hoverImage?: string;
  title: string;
};

export function ProductImage({
  primaryImage,
  hoverImage,
  title,
}: ProductImageProps) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden">
      <Image
        src={primaryImage}
        fill
        alt={title}
        sizes="10vw"
        className="object-cover object-center transition-opacity duration-200 group-hover:opacity-0"
      />

      {hoverImage && (
        <Image
          src={hoverImage}
          fill
          alt={`${title} hover`}
          sizes="10vw"
          className="object-cover object-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      )}
    </div>
  );
}
