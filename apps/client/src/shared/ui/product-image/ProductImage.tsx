type ProductImageProps = {
  primaryImage: string;
  hoverImage?: string;
};

export function ProductImage({ primaryImage, hoverImage }: ProductImageProps) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-amber-800 transition-opacity duration-200 group-hover:opacity-0">
        {primaryImage}
      </div>

      {hoverImage && (
        <div className="absolute inset-0 h-full w-full bg-amber-300 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {hoverImage}
        </div>
      )}
    </div>
  );
}
