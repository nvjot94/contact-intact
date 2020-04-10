import React, { Fragment, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./contactItem";
import "./contactItem.css";
export const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;
  const { getContacts } = contactContext;
  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  if (contacts.length !== 0 && contacts.length === 0) {
    return <h4> please enter the contacts</h4>;
  }
  return (
    <Fragment>
      {filtered === null
        ? contacts.map(contact => <ContactItem contact={contact} key={contact._id} />)
        : filtered.map(contact => <ContactItem contact={contact} key={contact._id} />)}
    </Fragment>
  );
};

export default Contacts;
