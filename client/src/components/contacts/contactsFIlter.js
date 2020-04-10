import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

export const ContactsFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef("");

  useEffect(() => {
    if (contactContext.filtered === null) {
      text.current.value = "";
    }
    //eslint-disable-next-line
  }, []);
  const onChange = e => {
    if (text.current.value !== "") {
      contactContext.filterContacts(e.target.value);
    } else {
      contactContext.clearFilteredContacts();
    }
  };
  return (
    <form>
      <input ref={text} type="text" placeholder="filter contacts..." onChange={onChange}></input>
    </form>
  );
};

export default ContactsFilter;
