const mongoose = require('mongoose');

const ContactModelSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel',
            required: true
        },
       name : {
               type: String,
               required:  [true, 'Please provide a name'] 
        },
        email : {
              type: String,
              required: true
        },
        phone : {
            type: String,
            required: true
        }
    },
    {timestamps : true}
);

const ContactModel = mongoose.model('ContactModel', ContactModelSchema);
module.exports = ContactModel;