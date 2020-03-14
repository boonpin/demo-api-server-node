const mongoose = require("mongoose");
const {Schema} = mongoose;

const schema = new Schema(
    {
        _id: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        type: {
            type: String,
            default: null
        },
        amount: {
            type: Number,
            default: 0
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

/**
 * statics
 */
schema.statics = {};

/**
 * Methods
 */
schema.method({});

module.exports = mongoose.model("Product", schema);
