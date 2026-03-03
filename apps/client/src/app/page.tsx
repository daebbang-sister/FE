import { Dropdown } from "packages/ui/src";

export default function Page() {
  const phoneOptions = [
    { label: "010", value: "010" },
    { label: "011", value: "011" },
    { label: "016", value: "016", disabled: true },
    { label: "017", value: "017" },
    { label: "018", value: "018" },
    { label: "019", value: "019" },
  ];

  return (
    <div>
      <div className=" w-3xl space-y-6">
        {/* ① 전체 disabled */}
        <Dropdown
          name="phonePrefixAllDisabled"
          placeholder="선택"
          options={phoneOptions}
          status="disabled"
          size="L"
        />

        {/* ② 016만 disabled */}
        <Dropdown
          name="phonePrefixPartialDisabled"
          placeholder="선택"
          options={phoneOptions}
          size="L"
        />

        <Dropdown
          name="phonePrefixPartialDisabled"
          placeholder="사이즈를 선택해주세요."
          options={phoneOptions}
          size="L"
        />
      </div>
      <div className=" w-sm space-y-6 ml-auto">
        {/* 정렬 */}
        <Dropdown
          name="phonePrefixPartialDisabled"
          defaultValue="정렬"
          options={phoneOptions}
          size="M"
          className="w-20 ml-auto"
        />
      </div>
    </div>
  );
}
