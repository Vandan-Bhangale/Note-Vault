const mongoose = require('mongoose');
// const User = require('./userModel');

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
    },
    createdAt: {
        type:Date,
        default: Date.now
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,
    }
},{timestamps:true});

noteSchema.index({userId:1,createdAt:-1});

const noteModel = mongoose.model('notes',noteSchema);

module.exports = noteModel;