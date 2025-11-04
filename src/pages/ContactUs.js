import React from "react";
import supabase from "../helper/supabaseClient";
import InfoModalContext from "../store/infoModal-context";

function ContactUs() {
  const name = React.useRef();
  const email = React.useRef();
  const phone = React.useRef();
  const message = React.useRef();

  const modalCtx = React.useContext(InfoModalContext);
  const [isSent, setIsSent] = React.useState(false);

  async function sendContactData(event) {
    event.preventDefault();
    const contact = {
      name: name.current.value,
      email: email.current.value,
      phone: phone.current.value,
      message: message.current.value,
    };
    try {
      const {data, error} = await supabase.from("contact-form").insert({contactDetails: contact}).select();

      if (error) {
        console.log(error);
        throw new Error(`${error.code} ${error.message}`)
      }

      console.log(data);

      name.current.value = "";
      email.current.value = "";
      phone.current.value = "";
      message.current.value = "";

      setIsSent(true);
    } catch (error) {
      modalCtx.showModal(error);
    }
  }

  let content = (
    <form onSubmit={sendContactData}>
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" ref={name} required />
      <label htmlFor="email">E-Mail:</label>
      <input id="name" type="email" ref={email} required />
      <label htmlFor="phone">Contact Number:</label>
      <input id="phone" type="tel" ref={phone} required />
      <label htmlFor="message">Message:</label>
      <textarea id="message" ref={message} />
      <button type="submit" className="action-button">Contact Us</button>
    </form>
  );

  if (isSent) content = <p>Thank you for reaching out to us!</p>;

  return (
    <>
      <div className="container-form">
        <h2>Contact Us</h2>
        <div className="form-container">{content}</div>
      </div>
    </>
  );
}

export default ContactUs;
