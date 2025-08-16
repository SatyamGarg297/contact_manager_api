const express = require('express');
const router = express.Router();
const {createContact, getContacts, getContactById, updateContact} = require('../controllers/contactController');

router.post('/', createContact);
router.get('/', getContacts);
router.get('/:id', getContactById );
router.put('/:id', updateContact);

module.exports = router;