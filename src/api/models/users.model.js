const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema (
    {
        userName: {type: String, required: false},
        email: {type: String, required: true},
        password: {type: String, required: true},
        image: {type: String, required: false},
        properties: [{type: Schema.Types.ObjectId, ref: "property"}],
        role: {type: String, default: 'user', enum: ['admin', 'user', 'moderator']}

    }, {
        timestamps: true
    }
)

const User = mongoose.model('user', userSchema);

module.exports = User;
