type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBox({ value, onChange }: Props) {
  return (
    <div className="searchbox">
      <span className="searchbox__icon">🔎</span>
      <input
        type="text"
        placeholder="Search To-do"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tasks"
      />
      {value && (
        <button
          className="searchbox__clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
