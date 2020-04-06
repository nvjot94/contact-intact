import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_ALERT,
  SET_CURRENT,
  CLEAR_FILTER,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  REMOVE_ALERT,
  UPDATE_CONTACT
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "navjot singh",
        email: "wanvjot94@gmail.com",
        phone: "0000000000",
        type: "personal"
      },
      {
        id: 2,
        name: "jagjot singh",
        email: "vnvjot94@gmail.com",
        phone: "0000000000",
        type: "professional"
      },
      {
        id: 3,
        name: "rabnoor singh",
        email: "anvjot94@gmail.com",
        phone: "0000000000",
        type: "personal"
      }
    ],
    current: null,
    filtered: null
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // add contact
  const addContact = contact => {
    contact.id = Math.round(Math.random() * 1000000);
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //delete contact

  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  //update contact

  //filter contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // clear filter
  const clearFilteredContacts = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  // set current
  const setCurrentContact = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // clear current
  const clearCurrentContact = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        updateContact,
        current: state.current,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        filterContacts,
        filtered: state.filtered,
        clearFilteredContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
