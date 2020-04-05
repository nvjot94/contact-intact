import {
    ADD_CONTACT, DELETE_CONTACT, SET_ALERT, SET_CURRENT,
    CLEAR_FILTER, CLEAR_CURRENT, FILTER_CONTACTS, REMOVE_ALERT
} from '../types';


export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }

        default:
            return state
    }
};

