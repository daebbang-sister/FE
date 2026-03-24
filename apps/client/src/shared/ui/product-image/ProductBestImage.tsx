type ProductBestImageProps = {
  primaryImage: string;
};

export function ProductBestImage({ primaryImage }: ProductBestImageProps) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-amber-800">
        {primaryImage}
      </div>
    </div>
  );
}
