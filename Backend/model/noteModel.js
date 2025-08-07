const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    }
})

const noteModel = mongoose.model('notes',noteSchema);

module.exports = noteModel;