const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const bookSchema=new Schema({
  id:String,
  title:String,
  author:String,
  releaseDate:String,
  summary:String,
  isAvaliable:Boolean
});

module.exports=mongoose.model("Book",bookSchema);
