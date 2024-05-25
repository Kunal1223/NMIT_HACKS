const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    userEmail:{
        type:String,
        required:true,
        
     }, 
     resEmail:{
        type:String,
        required:true,
        
     }, 
     
    Restro: {
        type: String,
        required: true,
    },
    VegPackets: {
        type: Number,
        required: true
    },
    VegPacketsType: {
        type: String,
        required: true
    },
    NonVegPacketsType: {
        type: String,
        required: true
    },
   NonVngPackets: {
        type: Number,
        required: true,
    },
    Messege: {
        type: String,
        required: true,
    },
    status:
    {
        type:String,
        default:"Order waiting to accept"
    },
    totalPrice: {
        type: Number,
        required: true,
        default:0
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('Order', OrderSchema);