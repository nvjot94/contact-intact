"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthMiddleware_1 = __importDefault(require("../../middleware/AuthMiddleware"));
const Contact_1 = __importDefault(require("../../database/models/Contact"));
const express_validator_1 = require("express-validator");
const contactRouter = express_1.default.Router();
// @route /api/contact
// @desc  get all contacts
// @access private
contactRouter.get("/", AuthMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield Contact_1.default.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// @route /api/contact
// @desc  delete a contact
// @access private
contactRouter.delete("/:id", AuthMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.user.id.toString();
    try {
        let contact = yield Contact_1.default.findById(req.params.id);
        if (!contact)
            return res.status(401).json({ msg: "contact not found" });
        if (contact.user.toString() !== userId)
            return res.status(401).json({ msg: "Not authorized" });
        yield Contact_1.default.findByIdAndDelete(req.params.id);
        res.json({ msg: "contact deleted" });
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
// @route /api/contact
// @desc  update a contact
// @access private
contactRouter.put("/:id", AuthMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let updatedContact = {};
    let userId = req.user.id;
    const { name, email, phone, type } = req.body;
    if (name)
        updatedContact.name = name;
    if (phone)
        updatedContact.phone = phone;
    if (email)
        updatedContact.email = email;
    if (type)
        updatedContact.type = type;
    try {
        let contact = yield Contact_1.default.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ msg: "contact not found" });
        }
        if (contact.user.toString() !== userId)
            return res.status(404).json({ msg: "Not authorized" });
        contact = yield Contact_1.default.findByIdAndUpdate(req.params.id, { $set: updatedContact }, { new: true });
        res.json(contact);
    }
    catch (e) {
        res.status(500).json(e);
    }
}));
// @route /api/contact
// @desc  post a contact
// @access private
contactRouter.post("/", [
    AuthMiddleware_1.default,
    express_validator_1.check("name", "please enter the contact name")
        .not()
        .isEmpty()
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req).array();
    if (errors.length !== 0) {
        res.status(401).json({ errors });
    }
    const { name, email, phone, type } = req.body;
    try {
        const newContact = new Contact_1.default({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });
        const contact = yield newContact.save();
        res.json(contact);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
exports.default = contactRouter;
