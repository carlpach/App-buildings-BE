const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema (
    {
        name: {type: String, required: true},
        constructionYear: {type: Number, required: true},
        shareholders: [
            {
                owner: {type: Schema.Types.ObjectId, ref: "user"},
                share: {type: Number, required: false}
            }
        ],
        image: {type: String},
        geometry: {
            location: {
                lat: {type: Number, required: false},
                lng: {type: Number, required: false},
            },
            boundingBox: [{type: Number, required: false}]

        }

    }, {
        timestamps: true
    }
)

const Property = mongoose.model("property", propertySchema);

module.exports = Property;

