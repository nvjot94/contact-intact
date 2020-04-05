import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

export const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { name, id, phone, type, email } = contact;

    const deleteContact = () => contactContext.deleteContact(id);

    const typeClass = type === 'professional' ? 'badge badge-success' : 'badge badge-primary';
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{' '}<span className={typeClass}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </h3>
            <ul className="list">
                {email && (<li> <i className="fas fa-envelope-open"></i> {email}</li>)}
                {phone && (<li> <i className="fas fa-phone"></i> {phone}</li>)}</ul>

            <p>
                <button className="btn btn-dark btn-sm">Edit</button>
                <button className="btn btn-danger btn-sm" onClick={deleteContact}>Delete</button>
            </p>
        </div>
    )
}
ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
};

export default ContactItem;
