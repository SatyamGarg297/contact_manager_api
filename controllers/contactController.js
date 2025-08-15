const ContactModel = require("../models/ContactModel");

// create contact
const createContact = async (req, res) => {
    try{
         const { name, email, phone } = req.body;
         if( !name || !email || !phone ){
            return res.status(400).json({ success: false , message: "Please fill all required fields" });
         }
         const newContact = new ContactModel({
            name,
            email,
            phone,
            userId: req.userId // link to logged-in user
         });

         const saveContact = await newContact.save();

         console.log("Contact created successfully");
         res.status(201).json({success: true, message: 'Contact created successfully', contact: saveContact });

    } catch (err) {
        console.error(err);
        res.status(500).json({success: false , error: "Internal Server Error"});
    }
}

module.exports = { createContact }