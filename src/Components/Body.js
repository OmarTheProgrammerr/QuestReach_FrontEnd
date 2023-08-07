import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { GiBranchArrow } from "react-icons/gi";
import "./Body.css";
import ContactInfo from "./ContactInfo";
import QRCodeDisplay from "./QRCodeDisplay";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoPersonAdd } from "react-icons/go";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NormalQR from "../Imgs/NormalQR.png";
import AIQR1 from "../Imgs/AIQR1.png";
import AIQR2 from "../Imgs/AIQR2.png";
import AIQR3 from "../Imgs/AIQR3.png";
import QRCode from "qrcode";

const Body = () => {
  const { register, handleSubmit, watch } = useForm();
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const fileInput = useRef();
  const [image, setImage] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(true);
  const [aiPromptAttempts, setAiPromptAttempts] = useState(0);
  const projectImages = [AIQR1, AIQR2, AIQR3];
  const [qrStyle, setQrStyle] = useState(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const watchedQrStyle = watch("qrStyle", qrStyle);
  const [paymentPrice, setPaymentPrice] = useState(0); // New paymentPrice state variable
  const [contactData, setContactData] = useState({});

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleAiPromptChange = (e) => {
    setAiPrompt(e.target.value);
  };

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  useEffect(() => {
    if (qrStyle === "ai") {
      setPaymentPrice(2.99);
    } else if (qrStyle === "normal") {
      setPaymentPrice(0.99);
    }
  }, [qrStyle]);

  const saveContact = async (contact) => {
    try {
      const response = await axios.post("/contact", contact);

      if (!response || !response.data || !response.data.url) {
        throw new Error("Failed to save contact or no data in response.");
      }

      const qrCode = response.data.url;
      const qrCodeParts = qrCode.split("/");
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    const {
      firstName,
      lastName,
      company,
      phoneNumber,
      email,
      ringtone,
      textTone,
      url,
      address,
      date,
      relatedName,
      socialProfile,
      instantMessage,
    } = data;

    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    if (fileInput.current.files[0]) {
      formData.append("image", fileInput.current.files[0]);
    }

    if (qrStyle === null) {
      alert("Please choose a QR code style before proceeding.");
      return;
    }

    try {
      if (qrStyle && !paymentCompleted) {
        const paymentResponse = await axios.post(
          "https://questreach-1a7d7eb0fdf4.herokuapp.com/payment",
          {
            amount: paymentPrice,
          }
        );

        if (paymentResponse.data.success) {
          setPaymentCompleted(true);
        } else {
          alert("Payment unsuccessful. Please try again.");
          return;
        }
      }
      if (data.qrStyle === "ai" && paymentCompleted) {
        // show the prompt ( actually maybe, show like a box on top of the generate button which would act like a prompt sumbition)
      }

      if (data.qrStyle === "normal" && !paymentCompleted) {
        const paymentResponse = await axios.post(
          "https://questreach-1a7d7eb0fdf4.herokuapp.com/payment",
          {
            amount: 0.99,
          }
        );

        if (paymentResponse.data.success) {
          setPaymentCompleted(true);
        } else {
          alert("Payment unsuccessful. Please try again.");
          return;
        }
      }

      const response = await axios.post(
        "https://questreach-1a7d7eb0fdf4.herokuapp.com/contact",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setContactData(data);

      if (qrStyle === "ai" && paymentCompleted) {
        formData.append("aiPrompt", aiPrompt);
      }
      const contactId = response.data.id;
      const BASE_URL =
        process.env.REACT_APP_BASE_URL ||
        "https://questreach-1a7d7eb0fdf4.herokuapp.com/";
      const qrUrl = `${BASE_URL}contact/${contactId}`;

      QRCode.toDataURL(
        qrUrl,
        { errorCorrectionLevel: "L" },
        function (err, url) {
          if (err) console.error(err);
          else setQrCode(url);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <div className="body">
      <h1>Let's get started right away</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="image_contact_wrapper">
          {image ? (
            <img
              className="image_contact"
              src={image}
              alt="Upload"
              onClick={() => fileInput.current.click()}
            />
          ) : (
            <GoPersonAdd
              size={10}
              className="image_contact"
              onClick={() => fileInput.current.click()}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInput}
            style={{ display: "none" }}
          />
        </div>

        {Object.keys(contactData).length > 0 && (
          <ContactInfo contactData={contactData} />
        )}

        <div className="form-inputs">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInput}
            style={{ display: "none" }}
          />
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
          />
          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
          />
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
          <input
            type="text"
            placeholder="Text Tone"
            {...register("textTone")}
          />
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
              <span>More?</span>
            </div>
            <div
              className={`content-container ${
                isContentVisible ? "expanded" : ""
              }`}
            >
              {isContentVisible && (
                <div className="form-inputs">
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
                </div>
              )}
            </div>
          </div>
          <div className="qr-selection">
            <div className="radio-group">
              <label style={{ marginRight: "20px" }}>
                <input
                  type="radio"
                  value="normal"
                  {...register("qrStyle")}
                  onChange={(e) => setQrStyle(e.target.value)}
                />
                Normal QR Code - $0.99
                <div
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    width: "200px",
                    height: "200px",
                    margin: "10px 0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={NormalQR}
                    alt="Normal QR Code"
                    style={{ width: "180px", height: "180px" }}
                  />
                </div>
              </label>
              <label style={{ marginRight: "20px" }}>
                <input
                  type="radio"
                  value="ai"
                  {...register("qrStyle")}
                  onChange={(e) => setQrStyle(e.target.value)}
                />
                AI Styled QR Code - $2.99
                <div
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    width: "200px",
                    height: "200px",
                    marginTop: "10px",
                  }}
                >
                  <Slider {...settings}>
                    {projectImages.map((image, index) => (
                      <div key={index} className="project-slide">
                        <img
                          src={image}
                          alt={`Project ${index + 1}`}
                          className="project-image"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </label>

              {qrStyle === "ai" && paymentCompleted && (
                <div style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    placeholder="Enter AI Prompt"
                    value={aiPrompt}
                    onChange={handleAiPromptChange}
                    style={{
                      margin: "55px auto",
                      position: "absolute",
                      display: "block",
                    }}
                  />
                </div>
              )}
            </div>

            <button type="submit">Generate QR Code</button>
          </div>
          {qrCode && <QRCodeDisplay qrCode={qrCode} />}
        </div>
      </form>
    </div>
  );
};

export default Body;
