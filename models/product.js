const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        maxlength: 32,

    },
    description:{
        type:String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        
    },
    count:{
        type: Number,
        default:1
    },
    sold:{
        type: Number,
        default:0
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    category:{
        type: ObjectId,
        ref:"Category",
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema)