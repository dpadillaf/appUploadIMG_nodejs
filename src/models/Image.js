const { Schema, model } = require( 'mongoose' );

const imageSchema = new Schema( {
    title: String,
    description: String,
    filename: String,
    path: String,
    originalname: String,
    mimetype: String,
    size: Number,
    created_at: { type: Date, default: Date.now() }
} );

module.exports = model( 'Image', imageSchema );