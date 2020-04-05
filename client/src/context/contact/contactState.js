import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT, DELETE_CONTACT, SET_ALERT, SET_CURRENT, CLEAR_FILTER,
    CLEAR_CURRENT, FILTER_CONTACTS, REMOVE_ALERT
} from '../types';


const ContactState = props => {
    const initialState = {
        contacts: [{ id: 1, name: "navjot singh", email: "nvjot94@gmail.com", phone: "0000000000", type: "personal" },
        { id: 2, name: "navjot singh", email: "nvjot94@gmail.com", phone: "0000000000", type: "professional" },
        { id: 3, name: "navjot singh", email: "nvjot94@gmail.com", phone: "0000000000", type: "personal" }
        ]
    }
    const [state, dispatch] = useReducer(contactReducer, initialState);


    // add contact
    const addContact = contact => {
        contact.id = Math.round(Math.random() * 1000000);
        dispatch({ type: ADD_CONTACT, payload: contact });

    }

    //delete contact

    const deleteContact = id => {

        dispatch({ type: DELETE_CONTACT, payload: id });
    }
    //update contact

    //filter contacts

    // clear filter

    // set current

    // clear current

    return (<ContactContext.Provider value={{ contacts: state.contacts, addContact, deleteContact }}>
        {props.children}
    </ContactContext.Provider>)

};

export default ContactState;




