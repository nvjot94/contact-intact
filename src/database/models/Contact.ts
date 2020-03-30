import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true

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

