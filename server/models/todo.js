const mongoose =  require("mongoose");

const Todo = mongoose.model('Todo', {
    text: {
        type: String, // beware will cast to string if say use a number
        required: true,
        minlength: 1, // validate if 1 or more 
        trim: true // remove leading or trailing white space
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = { Todo };

