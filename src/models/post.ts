import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: Object,
        required: true
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
})

const Post = mongoose.model('Post', postSchema);
export {Post};
