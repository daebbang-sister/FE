import { Input } from "packages/ui/src";

export default function Page() {
  return (
    <div className="max-w-sm space-y-6 p-12">
      {/* 아이디 */}
      <div>
        <label htmlFor="username" className="block mb-1">
          아이디
        </label>
        <Input
          id="username"
          type="text"
          placeholder="아이디를 입력하세요"
          helperMessage="영문, 숫자 조합"
          errorMessage="에러"
        />
      </div>

      {/* 이메일 (에러 상태) */}
      <div>
        <label htmlFor="email" className="block mb-1">
          이메일
        </label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          status="error"
          errorMessage="이메일 형식이 올바르지 않습니다"
        />
      </div>

      {/* 비밀번호 */}
      <div>
        <label htmlFor="password" className="block mb-1">
          비밀번호
        </label>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          helperMessage="8자 이상 입력해주세요"
        />
      </div>

      {/* disabled */}
      <div>
        <label htmlFor="readonly-id" className="block mb-1">
          아이디 (수정 불가)
        </label>
        <Input id="readonly-id" status="disabled" value="readonly_user" />
      </div>
    </div>
  );
}
