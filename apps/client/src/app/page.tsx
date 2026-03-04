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
      <div className=" w-3xl space-y-6 ">
        {/* ① 전체 disabled */}
        <Dropdown
          id="phonePrefixAllDisabled"
          placeholder="선택"
          options={phoneOptions}
          status="disabled"
          size="L"
        />

        {/* ② 016만 disabled */}
        <Dropdown
          id="phonePrefixPartialDisabled"
          placeholder="선택"
          options={phoneOptions}
          size="L"
        />

        <Dropdown
          id="defaultValue"
          defaultValue="010"
          options={phoneOptions}
          size="L"
        />
      </div>
      <div className="flex justify-between space-y-6 ml-auto bg-amber-400">
        {/* 정렬 */}
        <div>ss</div>
        <Dropdown
          id="phonePrefixPartialDisabled"
          defaultValue="정렬"
          options={phoneOptions}
          size="M"
          className="w-auto ml-auto"
          menuWidth="w-30 "
        />
      </div>
    </div>
  );
}
