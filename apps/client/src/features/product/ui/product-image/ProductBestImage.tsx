import Image from "next/image";

type ProductBestImageProps = {
  primaryImage: string;
  title: string;
};

export function ProductBestImage({
  primaryImage,
  title,
}: ProductBestImageProps) {
  return (
    <div className="relative aspect-3/4 w-full overflow-hidden">
      <Image
        src={primaryImage}
        fill
        alt={title}
        sizes="10vw"
        className="object-cover object-center"
      />
    </div>
  );
}
