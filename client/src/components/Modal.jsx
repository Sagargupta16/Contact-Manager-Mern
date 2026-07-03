import { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({ onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-wrapper">
      <button
        className="modal-backdrop"
        onClick={onClose}
        aria-label="Close modal"
      />
      <dialog open className="modal-content" aria-labelledby="modal-title">
        <div className="modal-header">
          <h3 className="modal-title" id="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <i className="fas fa-times" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </dialog>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
