import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String, 
    description: String,
    price: Number,
    tags: {
        type: [String],
        default:[] 
    },
    user: {
        required:true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

const productModel = mongoose.model('product', productSchema)

export default productModel