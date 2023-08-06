import React from "react";

const ContactInfo = ({ contactData }) => {
  return (
    <div>
      <h2>Contact Information</h2>
      {Object.keys(contactData).map((key, index) => (
        <p key={index}>
          <strong>{key}: </strong> {contactData[key]}
        </p>
      ))}
    </div>
  );
};

export default ContactInfo;
