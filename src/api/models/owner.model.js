const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ownerSchema = new Schema (
    {
        name: {type: String, required: true},
        surname: {type: String, required: true},
        properties: [{type: Schema.Types.ObjectId, ref: "property"}],
        image: {type: String, required: false},

    }, {
        timestamps: true
    }
)

const Owner = mongoose.model("owner", ownerSchema);

module.exports = Owner;

