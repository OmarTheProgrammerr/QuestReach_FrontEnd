import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { GiBranchArrow } from "react-icons/gi";
import "./Body.css";
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
  console.log("this is khara: " + qrStyle);

  useEffect(() => {
    if (qrStyle === "ai") {
      // handle ai actions
    } else if (qrStyle === "normal") {
      // handle normal actions
    }
  }, [qrStyle]);
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
      // If the user selected ai qr code style and has not completed payment
      if (data.qrStyle === "ai" && !paymentCompleted) {
        // Trigger payment modal here ( show the payment in other words)
        // After payment is successful, setPaymentCompleted(true)
        // Here we make a POST request to your payment API
        const paymentResponse = await axios.post(
          "http://localhost:8000/payment",
          {
            amount: 2.99, // Set the amount to the correct price for the AI QR code
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

      // If the user selected normal qr code style and has not completed payment
      if (data.qrStyle === "normal" && !paymentCompleted) {
        // Trigger payment modal here
        // After payment is successful, setPaymentCompleted(true)
        // Here we make a POST request to your payment API
        const paymentResponse = await axios.post(
          "http://localhost:8000/payment",
          {
            amount: 0.99, // Set the amount to the correct price for the normal QR code
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
        "http://localhost:8000/contact",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setQrCode(response.data.qrCode);

      QRCode.toDataURL(
        response.data,
        {
          errorCorrectionLevel: "L", // Low error correction level
        },
        function (err, url) {
          if (err) console.error(err);
          else setQrCode(url);
        }
      );

      if (qrStyle === "ai" && paymentCompleted) {
        // add aiPrompt to formData
        formData.append("aiPrompt", aiPrompt);
      }
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
          {qrCode && (
            <div>
              <h2>Your QR Code:</h2>
              <img src={qrCode} alt="Your generated QR code" />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Body;
