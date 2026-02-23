export default function Page() {
  return (
    <div>
      <div className="p-6 title2">
        <p className="title2">낮은 가격순</p>
      </div>
      <input type="text" className="field " placeholder="test" />
      <input type="text" className="field" disabled placeholder="test" />
      <input type="text" className="field field-error " placeholder="test" />
    </div>
  );
}
