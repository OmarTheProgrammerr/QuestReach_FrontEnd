import React, { useState } from "react";
import { GiBranchArrow } from "react-icons/gi";
import "./ContactForm.css";

const ContactForm = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="form">
      {/* the rest of the fields go here */}
      <div
        className={`more-section ${showMore ? "open" : ""}`}
        onClick={() => setShowMore(!showMore)}
      >
        <GiBranchArrow size={30} className="arrow-icon" />
        <p>More?</p>
      </div>
      {showMore && <>{/* the last 12 fields go here */}</>}
      <select>
        <option value="normal">Normal QR code</option>
        <option value="ai">AI QR code</option>
      </select>
      <button type="submit">Generate QR code</button>
    </div>
  );
};

export default ContactForm;
