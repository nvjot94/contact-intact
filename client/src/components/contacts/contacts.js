import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./contactItem";
import "./contactItem.css";
//import { CSSTransition, TransitionGroup } from "react-transition-group";
export const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4> please enter the contacts</h4>;
  }
  return (
    <Fragment>
      {filtered === null
        ? contacts.map(contact => <ContactItem contact={contact} key={contact.id} />)
        : filtered.map(contact => <ContactItem contact={contact} key={contact.id} />)}
    </Fragment>
  );
};

export default Contacts;
