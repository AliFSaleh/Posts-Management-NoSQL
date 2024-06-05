import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user:{
        type: Object,
        required: true,
    },
    package:{
        type: Object,
        required: false,
    },
    type: {
        type: String,
        required: true,
        enum: ['charge_amount', 'pay_for_package'],
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema);
export {Transaction};