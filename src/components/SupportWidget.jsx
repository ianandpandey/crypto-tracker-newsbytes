import { useState } from "react";
import "./support.css";
import { CiMail } from "react-icons/ci";

const SupportWidget = () => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <button
        className={`support-btn ${disabled ? "disabled" : ""}`}
        onClick={() => setOpen(true)}
        disabled={disabled}
        aria-label="Support"
      >
        <CiMail />
      </button>

      {open && (
        <div className="support-overlay">
          <div className="support-modal">
            <button className="close-btn" onClick={() => setOpen(false)}>
              ×
            </button>
            {/* Form will be added later */}
          </div>
        </div>
      )}
    </>
  );
};

export default SupportWidget;
