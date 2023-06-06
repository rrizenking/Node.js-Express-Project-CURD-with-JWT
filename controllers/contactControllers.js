const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id:req.user.id});
    if(!contacts)
    {
        res.status(404);
        throw new Error('Contact Not Found');
    }

    res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
    const {name, email, mobile} = req.body;
    if(!name || !email || !mobile){
        res.status(404);
        throw new Error('All fields mandate');
    }
    const contact = await Contact.create({
        name,
        email,
        mobile,
        user_id:req.user.id
    })
    res.status(201).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error('Contact Not Found');
    }
    
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update other user contact");
    }
    
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.status(202).json(updateContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error('Contact Not Found Delete');
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to delete other user contact");
    }

    const deleteContact = await Contact.findByIdAndDelete(req.params.id);

    res.status(203).json(deleteContact);
});

module.exports = {getContact, createContact, updateContact, deleteContact};