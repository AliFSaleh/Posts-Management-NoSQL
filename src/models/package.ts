import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    postsNumber: {
        type: Number,
    },
})

const Package = mongoose.model('Package', packageSchema);
export {Package};
