interface MenuBtnProps {
  isDisplay: boolean;
  handleMenuBtnClick: () => void;
  handleResetBtnClick: () => void;
  handleNewRoundBtnClick: () => void;
}

export function Button({
  isDisplay,
  handleMenuBtnClick,
  handleResetBtnClick,
  handleNewRoundBtnClick,
}: MenuBtnProps) {
  return (
    <div className="action-menu">
      <button
        className={`menu-btn ${isDisplay && "border-expanded"}`}
        onClick={handleMenuBtnClick}
      >
        Actions
        <i
          className={`fa-solid fa-angle-down ${isDisplay && "reverse-direction"}`}
        ></i>
      </button>

      {isDisplay && (
        <div className="action-modal border-expanded">
          <button id="reset-btn" onClick={handleResetBtnClick}>
            Reset
          </button>
          <button id="new-round-btn" onClick={handleNewRoundBtnClick}>
            New Round
          </button>
        </div>
      )}
    </div>
  );
}
