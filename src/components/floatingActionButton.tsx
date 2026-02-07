type Props = { onClick: () => void; label?: string };

export default function FloatingActionButton({
  onClick,
  label = "Add",
}: Props) {
  return (
    <button className="fab" onClick={onClick} aria-label={label} title={label}>
      +
    </button>
  );
}
