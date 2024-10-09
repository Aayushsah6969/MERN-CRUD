import mongoose from 'mongoose';

const textSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: false,
    }
});

const Text = mongoose.model('Text', textSchema);

export default Text;