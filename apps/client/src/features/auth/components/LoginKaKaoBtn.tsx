export default function LoginKaKaoBtn() {
  return (
    <>
      <button
        type="button"
        onClick={() => {
          window.location.href = "/api/proxy/oauth2/authorization/kakao";
        }}
        className="flex h-12.75 w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] px-4 py-3 font-bold text-black hover:brightness-95 active:brightness-90"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path d="M10 2C4.9 2 1 5.3 1 9.2c0 2.5 1.7 4.7 4.2 6l-.6 2.4c-.1.4.3.7.7.5l2.8-1.8c.6.1 1.2.2 1.9.2 5.1 0 9-3.3 9-7.3S15.1 2 10 2z" />
        </svg>
        카카오 로그인
      </button>
    </>
  );
}
