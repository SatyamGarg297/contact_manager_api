const express = require('express');
const router = express.Router();
const {createContact, getContacts, getContactById, updateContact, deleteContact} = require('../controllers/contactController');
const {  validateContact, validateUpdateContact, validateObjectIdParam } = require('../middleware/validationMiddleware');

router.post('/', validateContact, createContact);
router.get('/', getContacts);
router.get('/:id', validateObjectIdParam("id"), getContactById );
router.put('/:id', validateObjectIdParam("id"), validateUpdateContact, updateContact);
router.delete('/:id', validateObjectIdParam("id"), deleteContact );

module.exports = router;