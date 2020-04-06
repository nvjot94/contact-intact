import React from "react";
import Contacts from "../contacts/contacts";
import ContactForm from "../contacts/contactform";
import ContactsFilter from "../contacts/contactsFIlter";
const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactsFilter />
        <Contacts />
      </div>
    </div>
  );
};
export default Home;
