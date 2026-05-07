type Props = {
  rating?: number;
  onChange?: (rating: number) => void;
};

export default function ReviewRatingsButton({ rating = 0, onChange }: Props) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const score = i + 1;
        const isActive = score <= rating;

        return (
          <button
            key={score}
            type="button"
            onClick={() => onChange?.(score)}
            className="cursor-pointer"
            aria-label={`${score}점`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.24897 0.487005L4.54019 4.10687L0.717021 4.68922C0.0314143 4.79311 -0.243352 5.67621 0.253844 6.182L3.01982 8.99806L2.36562 12.9761C2.24786 13.6951 2.97272 14.2337 3.57982 13.8975L7 12.0192L10.4202 13.8975C11.0273 14.231 11.7521 13.6951 11.6344 12.9761L10.9802 8.99806L13.7462 6.182C14.2434 5.67621 13.9686 4.79311 13.283 4.68922L9.45981 4.10687L7.75103 0.487005C7.44486 -0.158228 6.55776 -0.16643 6.24897 0.487005Z"
                fill={isActive ? "#FEC300" : "#E0DFE4"}
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
