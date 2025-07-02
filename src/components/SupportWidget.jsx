import { useState } from "react";
import "./support.css";
import { CiMail } from "react-icons/ci";
import { MdDoneAll } from "react-icons/md";


const SupportWidget = () => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      err.email = "Valid email is required";
    if (!formData.message.trim()) err.message = "Message is required";
    return err;
  };

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setDisabled(true);
      setOpen(false);
    }, 2000);
  };

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
            <form onSubmit={handleSubmit}>
              {!submitted ? (
                <>
                  <label>
                    Name*
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <span className="error">{errors.name}</span>
                    )}
                  </label>
                  <label>
                    Email*
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </label>
                  <label>
                    Message*
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    {errors.message && (
                      <span className="error">{errors.message}</span>
                    )}
                  </label>
                  <button type="submit" className="submit-btn">
                    Send
                  </button>
                </>
              ) : (
                <div className="thank-you">
                  <div className="checkmark">
                    <MdDoneAll />
                  </div>
                  <p>Thanks for reaching out!</p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportWidget;
