import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import axios from "axios";
import contactReducer from "./contactReducer";

import {
  ADD_CONTACT,
  GET_CONTACTS,
  DELETE_CONTACT,
  SET_ALERT,
  SET_CURRENT,
  CLEAR_FILTER,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CONTACT_ERROR,
  REMOVE_ALERT,
  UPDATE_CONTACT,
  CLEAR_CONTACTS
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);
  const contactUrl = "http://localhost:8080/api/contact";
  // Get contacts

  const getContacts = async () => {
    const res = await axios.get(contactUrl);
    try {
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.data.msg });
    }
  };

  //clear contacts on logout
  const logoutContacts = () => dispatch({ type: CLEAR_CONTACTS });

  // add contact
  const addContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(contactUrl, contact, config);
    try {
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response });
    }
  };

  //delete contact
  const deleteContact = async id => {
    const res = await axios.delete(`${contactUrl + `/${id}`}`);
    try {
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response });
    }
  };

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

  const updateContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put(`${contactUrl + `/${contact._id}`}`, contact, config);
    try {
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        updateContact,
        logoutContacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        filterContacts,
        filtered: state.filtered,
        clearFilteredContacts,
        getContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
