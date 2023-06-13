const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {type:String, required:true},
    slug: {type:String, required:true, unique:true},
    desc: {type:String, required:true,},
    highlight: {type:Array, required:true},
    img: {type:Array, required:true},
    category: {type:String, required:true,},
    size: {type:String},
    color: {type:String},
    price: {type:Number, required:true},
    salePrice: {type:Number},
    availableQty: {type:Number, required:true},

}, {timestamps: true});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema
);