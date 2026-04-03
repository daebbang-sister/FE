type XButtonProps = {
  onClick?: () => void;
  className?: string;
  iconSize?: number;
  buttonSize?: number;
};

export function XButton({
  onClick,
  className = "",
  iconSize = 15,
  buttonSize = 19,
}: XButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{ width: buttonSize, height: buttonSize }}
      className={`flex items-center justify-center ${className}`}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 14.2447 14.2447"
        fill="currentColor"
      >
        <path d="M14.1196 13.4846L7.75464 7.11963L14.1196 0.754661C14.2863 0.582122 14.2863 0.308527 14.1196 0.135934C13.9488 -0.0409541 13.6668 -0.0458465 13.49 0.125007L7.12498 6.48998L0.760063 0.125062C0.587524 -0.0416064 0.31393 -0.0416064 0.141336 0.125062C-0.0355516 0.295916 -0.0404439 0.577827 0.13041 0.754715L6.49533 7.11963L0.13041 13.4846C0.0469128 13.5681 1.11361e-08 13.6813 1.11361e-08 13.7994C-5.44068e-05 14.0453 0.199339 14.2447 0.445264 14.2447C0.563388 14.2448 0.676675 14.1979 0.760063 14.1142L7.12498 7.74929L13.49 14.1143C13.5733 14.1979 13.6867 14.2449 13.8048 14.2447C13.9228 14.2447 14.036 14.1978 14.1195 14.1144C14.2935 13.9405 14.2935 13.6585 14.1196 13.4846Z" />
      </svg>
    </button>
  );
}
