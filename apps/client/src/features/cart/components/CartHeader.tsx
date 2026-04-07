import { CheckBox } from "@repo/ui";

type CartHeaderProps = {
  isAllChecked: boolean;
  onToggleAll: () => void;
  onDeleteSelected: () => void;
  onDeleteAll: () => void;
};

export default function CartHeader({
  isAllChecked,
  onToggleAll,
  onDeleteSelected,
  onDeleteAll,
}: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-1.75">
        <CheckBox id="all" checked={isAllChecked} onChange={onToggleAll} />
        전체 선택
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDeleteSelected}
          className="text-text-disabled hover:text-text-primary transition duration-200"
        >
          선택 삭제
        </button>
        <button
          onClick={onDeleteAll}
          className="text-text-disabled hover:text-text-primary"
        >
          전체 삭제
        </button>
      </div>
    </div>
  );
}
