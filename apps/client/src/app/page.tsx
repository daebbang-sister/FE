import { CheckBox } from "packages/ui/src";

export default function Page() {
  return (
    <div className="max-w-sm space-y-6 p-12">
      <div className="flex items-center gap-1.5">
        <CheckBox id="agree" />
        <label htmlFor="agree">동의합니다.</label>
      </div>
    </div>
  );
}
