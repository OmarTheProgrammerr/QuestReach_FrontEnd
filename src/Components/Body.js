import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GiBranchArrow } from "react-icons/gi";
import "./Body.css";

const Body = () => {
  const { register, handleSubmit } = useForm();
  const [isContentVisible, setIsContentVisible] = useState(false);

  const onSubmit = (data) => console.log(data); // Replace this with your actual logic

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <div className="body">
      <h1>Let's get started right away</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input
          type="text"
          placeholder="First Name"
          {...register("firstName")}
        />
        <input type="text" placeholder="Last Name" {...register("lastName")} />
        <input type="text" placeholder="Company" {...register("company")} />
        <input
          type="tel"
          placeholder="Phone Number"
          {...register("phoneNumber")}
        />
        <input
          type="email"
          placeholder="Email Address"
          {...register("email")}
        />
        <input type="text" placeholder="Ringtone" {...register("ringtone")} />
        <input type="text" placeholder="Text Tone" {...register("textTone")} />
        <input type="url" placeholder="URL" {...register("url")} />
        <input type="text" placeholder="Address" {...register("address")} />
        <input type="date" placeholder="Date" {...register("date")} />
        <input
          type="text"
          placeholder="Related Name"
          {...register("relatedName")}
        />
        <input
          type="text"
          placeholder="Social Profile"
          {...register("socialProfile")}
        />
        <input
          type="text"
          placeholder="Instant Message"
          {...register("instantMessage")}
        />
        <div className="toggle-section">
          <div onClick={toggleContent} className="more-toggle">
            <GiBranchArrow
              className={`toggle-arrow ${isContentVisible ? "open" : ""}`}
            />
            <span>More</span>
          </div>
          <div
            className={`content-container ${
              isContentVisible ? "expanded" : ""
            }`}
          >
            {isContentVisible && (
              <>
                <input
                  type="text"
                  placeholder="Prefix"
                  {...register("prefix")}
                />
                <input
                  type="text"
                  placeholder="Phonetic First Name"
                  {...register("phoneticFirstName")}
                />
                <input
                  type="text"
                  placeholder="Pronunciation First Name"
                  {...register("pronunciationFirstName")}
                />
                <input
                  type="text"
                  placeholder="Middle Name"
                  {...register("middleName")}
                />
                <input
                  type="text"
                  placeholder="Phonetic Last Name"
                  {...register("phoneticLastName")}
                />
                <input
                  type="text"
                  placeholder="Maiden Name"
                  {...register("maidenName")}
                />
                <input
                  type="text"
                  placeholder="Suffix"
                  {...register("suffix")}
                />
                <input
                  type="text"
                  placeholder="Nickname"
                  {...register("nickname")}
                />
                <input
                  type="text"
                  placeholder="Job Title"
                  {...register("jobTitle")}
                />
                <input
                  type="text"
                  placeholder="Department"
                  {...register("department")}
                />
                <input
                  type="text"
                  placeholder="Phonetic Company Name"
                  {...register("phoneticCompanyName")}
                />
              </>
            )}
          </div>
        </div>
        <div className="qr-selection">
          <div className="radio-group">
            <label>
              <input type="radio" value="normal" {...register("qrStyle")} />
              Normal QR Code
            </label>
            <label>
              <input type="radio" value="ai" {...register("qrStyle")} />
              AI Styled QR Code
            </label>
          </div>
          <button type="submit">Generate QR Code</button>
        </div>
      </form>
    </div>
  );
};

export default Body;
