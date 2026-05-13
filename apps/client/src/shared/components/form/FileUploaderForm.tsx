import Image from "next/image";

type Props = {
  imageUrls?: string[];
  images: File[];
  maxCount?: number;
  onChangeImageUrls?: (imageUrls: string[]) => void;
  onChangeImages: (images: File[]) => void;
};

export default function FileUploader({
  imageUrls = [],
  images,
  maxCount = 4,
  onChangeImageUrls,
  onChangeImages,
}: Props) {
  const previewImages = [
    ...imageUrls.map((url) => ({
      type: "url" as const,
      src: url,
    })),
    ...images.map((file) => ({
      type: "file" as const,
      file,
      src: URL.createObjectURL(file),
    })),
  ];

  return (
    <div className="flex gap-1">
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        id="image-upload"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          const remainCount = maxCount - previewImages.length;

          onChangeImages([...images, ...files.slice(0, remainCount)]);
          e.target.value = "";
        }}
      />

      <label
        htmlFor={previewImages.length >= maxCount ? undefined : "image-upload"}
      >
        <div className="bg-text-primary body1 text-neutral-0 flex h-25 w-25 cursor-pointer flex-col items-center justify-center gap-2">
          <p>사진 추가</p>
          <p>
            ({previewImages.length}/{maxCount})
          </p>
        </div>
      </label>

      {previewImages.map((item) => (
        <div key={item.src} className="relative h-25 w-25 overflow-hidden">
          <p
            className="absolute top-1.5 right-1.5 cursor-pointer"
            onClick={() => {
              if (item.type === "url") {
                onChangeImageUrls?.(
                  imageUrls.filter((url) => url !== item.src)
                );
              } else {
                onChangeImages(images.filter((file) => file !== item.file));
              }
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.03125 0C3.14812 0 0 3.14812 0 7.03125C0 10.9144 3.14812 14.0625 7.03125 14.0625C10.9144 14.0625 14.0625 10.9144 14.0625 7.03125C14.0625 3.14812 10.9144 0 7.03125 0ZM10.2891 4.43625L7.67625 7.04906L9.98813 9.62625C10.0735 9.71466 10.1208 9.83306 10.1197 9.95597C10.1186 10.0789 10.0693 10.1964 9.98241 10.2834C9.8955 10.3703 9.77794 10.4196 9.65503 10.4206C9.53213 10.4217 9.41372 10.3744 9.32531 10.2891L7.01344 7.71187L4.43625 10.2891C4.34784 10.3744 4.22944 10.4217 4.10653 10.4206C3.98363 10.4196 3.86606 10.3703 3.77915 10.2834C3.69224 10.1964 3.64294 10.0789 3.64187 9.95597C3.6408 9.83306 3.68805 9.71466 3.77344 9.62625L6.38625 7.01344L4.07438 4.43625C3.98899 4.34784 3.94174 4.22944 3.94281 4.10653C3.94388 3.98363 3.99318 3.86606 4.08009 3.77915C4.167 3.69224 4.28456 3.64294 4.40747 3.64187C4.53037 3.6408 4.64878 3.68805 4.73719 3.77344L7.04906 6.35063L9.62625 3.77344C9.71466 3.68805 9.83306 3.6408 9.95597 3.64187C10.0789 3.64294 10.1964 3.69224 10.2834 3.77915C10.3703 3.86606 10.4196 3.98363 10.4206 4.10653C10.4217 4.22944 10.3744 4.34784 10.2891 4.43625Z"
                fill="#1D2433"
              />
            </svg>
          </p>
          <Image
            width={100}
            height={100}
            src={item.src}
            alt="preview"
            className="bg-neutral-300 object-cover"
          />
        </div>
      ))}
    </div>
  );
}
