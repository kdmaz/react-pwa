import { ReactNode } from "react";
import { createPortal } from "react-dom";
import "./modal.css";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ open, onClose, children }: Props) {
  const portalContainerElement = document.getElementById("portal");

  if (!open || !portalContainerElement) {
    return null;
  }

  return createPortal(
    <div className="overlay" onClick={() => onClose()}>
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    portalContainerElement
  );
}

export { Modal };
