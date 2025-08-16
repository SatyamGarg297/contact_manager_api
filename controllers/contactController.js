const mongoose = require("mongoose");
const ContactModel = require("../models/ContactModel");

// create contact
const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required fields" });
    }
    const newContact = new ContactModel({
      name,
      email,
      phone,
      userId: req.userId, // link to logged-in user
    });

    const saveContact = await newContact.save();

    console.log("Contact created successfully");
    res.status(201).json({
      success: true,
      message: "Contact created successfully",
      contact: saveContact,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// get all contacts
const getContacts = async (req, res) => {
  try {
    // Find contacts only belonging to the logged-in user
    const AllContacts = await ContactModel.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    // If no contacts found
    if (!AllContacts || AllContacts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No contacts found for this user.",
        count: 0,
        contacts: [],
      });
    }

    // Success response
    console.log(AllContacts);
    res.status(200).json({
      success: true,
      message: "All contacts fetched successfully ",
      count: AllContacts.length,
      contacts: AllContacts,
    });
  } catch (err) {
    console.error("Error fetching contacts:", err.message);
    res.status(500).json({ success: false, error: "Internal Server error" });
  }
};

const getContactById = async (req, res) => {
  try {
    const contactId = req.params.id;

    // Validate objectId format
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID formate",
      });
    }

    const getContact = await ContactModel.findOne({
      _id: contactId,
      userId: req.userId,
    });
    if (!getContact) {
      return res
        .status(404)
        .json({ success: false, message: "contact not found" });
    }

    console.log(getContact);
    res.status(200).json({
      success: true,
      message: "contact fetched successfully",
      contact: getContact,
    });
  } catch (err) {
    console.error("Error fetching contact: ", err.message);
    res.status(500).json({ success: false, error: "Internal Server error" });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contactData = req.body;

    const contact = await ContactModel.findById(contactId);
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }

    if (contact.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to update this contact",
        });
    }

    const contactUpdated = await ContactModel.findByIdAndUpdate(
      contactId,
      contactData,
      {
        new: true,
        runValidators: true,
      }
    );

    console.log("contact updated successfully");
    res.status(200).json({
      success: true,
      message: "contact updated successfully",
      contactUpdated: contactUpdated,
    });
  } catch (err) {
    console.error("Error updating contact: ", err.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    const contact = await ContactModel.findById(contactId);

    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "contact not found" });
    }
    if (contact.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to delete this contact",
        });
    }

    await contact.deleteOne();
    console.log("contact deleted successfully");
    
    res
      .status(200)
      .json({ success: true, message: "contact deleted successfully" });
  } catch (err) {
    console.error("Error deleting contact: ", err.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = { createContact, getContacts, getContactById, updateContact, deleteContact };
