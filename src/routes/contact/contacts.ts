import express, { Router, Request, Response } from 'express';
import AuthMiddleware from '../../middleware/AuthMiddleware';
import User from '../../database/models/User';
import Contact from '../../database/models/Contact';
import { check, validationResult } from 'express-validator';
const contactRouter: Router = express.Router();


// @route /api/contact
// @desc  get all contacts
// @access private
contactRouter.get('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const contacts = await Contact.find({ user: (req as any).user.id }).sort({ date: -1 });
        res.json(contacts);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});
// @route /api/contact
// @desc  delete a contact
// @access private

contactRouter.delete('/:id', AuthMiddleware, async (req: Request, res: Response) => {
    let userId = (req as any).user.id;
    try {
        let contact: any = await Contact.findById(req.params.id);

        if (!contact) res.status(401).json({ "msg": "contact not found" });

        if (contact.user.toString() !== userId) res.status(401).json({ "msg": "Not authorized" });
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ "msg": "contact deleted" });
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});




// @route /api/contact
// @desc  update a contact
// @access private

contactRouter.put('/:id', AuthMiddleware, async (req: Request, res: Response) => {
    let updatedContact: any = {};
    let userId = (req as any).user.id;
    const { name, email, phone, type } = req.body;

    if (name) updatedContact.name = name;
    if (phone) updatedContact.phone = phone;
    if (email) updatedContact.email = email;
    if (type) updatedContact.type = type;
    try {
        let contact: any = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ "msg": "contact not found" });
        }
        if (contact.user.toString() !== userId) return res.status(404).json({ "msg": "Not authorized" });
        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: updatedContact }, { new: true })
        res.json(contact);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});



// @route /api/contact
// @desc  post a contact
// @access private
contactRouter.post('/', [AuthMiddleware, check('name', 'please enter the contact name').not().isEmpty()], async (req: Request, res: Response) => {

    const errors: Array<{}> = validationResult(req).array();

    if (errors.length !== 0) {
        res.status(401).json({ errors });
    }

    const { name, email, phone, type } = req.body;
    try {
        const newContact = new Contact({
            name, email, phone, type, user: (req as any).user.id
        });
        const contact = await newContact.save();
        res.json(contact);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});

export default contactRouter;