import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true, index: true
    },
    name: {
        type: String,
        required: true

    },
    email: {
        type: String

    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default: 'personal'

    },
    date: {
        type: Date,
        required: true,
        default: Date.now()

    }
})

export default mongoose.model('contact', ContactSchema);

