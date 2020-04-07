import React, { useEffect, useContext } from "react";
import Contacts from "../contacts/contacts";
import ContactForm from "../contacts/contactform";
import ContactsFilter from "../contacts/contactsFIlter";
import AuthContext from "../../context/auth/AuthContext";
const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

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
