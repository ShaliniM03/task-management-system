import React from "react";

type Props = {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightSlot?: React.ReactNode;
};

export default function AppBar({ title, showBack, onBack, rightSlot }: Props) {
  return (
    <header className="appbar">
      <div className="appbar__inner">
        <div className="appbar__left">
          {showBack && (
            <button
              className="icon-btn inverse"
              aria-label="Back"
              onClick={onBack}
            >
              ←
            </button>
          )}
          <h1 className="appbar__title">{title}</h1>
        </div>
        <div className="appbar__right">{rightSlot}</div>
      </div>
    </header>
  );
}
