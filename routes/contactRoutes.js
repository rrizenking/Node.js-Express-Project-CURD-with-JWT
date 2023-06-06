const express = require('express');
const router = express.Router();
const {getContact, createContact, updateContact, deleteContact} = require('../controllers/contactControllers');
const validateToken = require('../middleware/validateTockenHandller');

router.use(validateToken);
router.route('/').get(getContact);

router.route('/').post(createContact);

router.route('/:id').put(updateContact);

router.route('/:id').delete(deleteContact);

module.exports = router;