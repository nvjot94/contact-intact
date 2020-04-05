import React from 'react'
import Contacts from '../contacts/contacts';
import ContactForm from '../contacts/contactform';
const Home = () => {
    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <Contacts />
            </div>

        </div>
    )
}
export default Home;