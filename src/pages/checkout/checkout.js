import axios from "axios";
import React from "react";
import { useState } from "react";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [btnEnabled, setBtnEnabled] = useState(true);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCheckout = async () => {
    setBtnEnabled(false);
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/checkout`, {
        address,
      });
      setSubmitMessage("checkout successful");
    } catch (e) {
      setSubmitMessage("failed, please try again later");
      console.log("error");
    } finally {
      setBtnEnabled(true);
    }
  };

  return (
    <>
      <label htmlFor="address-input"> Address </label>
      <input onChange={handleAddressChange} id="address-input" />
      <button disabled={!btnEnabled} onClick={handleCheckout}>
        Checkout
      </button>
      <div hidden={!submitMessage}> {submitMessage} </div>
    </>
  );
};

export default Checkout;
