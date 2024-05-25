const mongoose=require('mongoose')
const { Schema } = mongoose;
 
const NGOSchema = new Schema({
name:{
    type:String,
    required:true
 },
 email:{
    type:String,
    required:true,
    unique:true
 }, 
 manager_name:{
    type:String,
    required:true
 },
 desc:{
    type:String,
    required:true
 },
 phone:{ 
   type:Number,
   required:true,
 },
 social_link:{
    type:String,
    required:true
 },
 password:{
    type:String,
    required:true
 },
 date: {
    type: Date,
    default: Date.now
},
imageUrl:{
   type:String,
   required:true,
   default:""
},
location :{
   type: String,
   required : true
}
});

module.exports=mongoose.model('NGO',NGOSchema);