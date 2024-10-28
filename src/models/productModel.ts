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
    },
    createAt:{
        type: Date,
        default : Date.now
    },
    updateAt:{
        type: Date,
        default : Date.now
    }
})

const productModel = mongoose.model('product', productSchema)

export default productModel