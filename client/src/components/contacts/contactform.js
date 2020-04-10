import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

export const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, updateContact, clearCurrentContact } = contactContext;

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
    }
  }, [contactContext, current]);

  const onChange = event => setContact({ ...contact, [event.target.name]: event.target.value });

  const onSubmit = event => {
    event.preventDefault();
    if (!current) {
      addContact(contact);
    } else if (current) {
      updateContact(contact);
      clearAll();
    }

    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal"
    });
  };

  const clearAll = () => {
    clearCurrentContact();
  };

  const { name, email, phone, type } = contact;
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{!current ? "Add Contact" : "Edit Contact"}</h2>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={onChange}
        required
      ></input>
      <input
        type="text"
        placeholder="email"
        name="email"
        value={email}
        onChange={onChange}
        required
      ></input>
      <input
        type="text"
        placeholder="phone"
        name="phone"
        value={phone}
        onChange={onChange}
        required
      ></input>
      <h5> Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={!current ? "Add Contact" : "Edit Contact"}
          className=" btn btn-primary btn-block"
        />
        {current && (
          <input
            type="submit"
            value="Clear"
            className=" btn btn-primary btn-block"
            onClick={clearAll}
          />
        )}
      </div>
    </form>
  );
};

export default ContactForm;
