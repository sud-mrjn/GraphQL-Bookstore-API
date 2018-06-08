const express = require('express')
const mongoose=require('mongoose')
const graphqlHttp=require('express-graphql')

const app=express()

const schema= require('./schema')


mongoose.connect('mongodb://localhost:27017/BookStoreGraphQL');
mongoose.connection
  .once('open', ()=>console.log("connected..."))
  .on('error',(err)=>{
     console.console.log(`could not connected`, err);
  });



app.use('/graphql',graphqlHttp({
schema,
graphiql: true
}));

app.listen(4200,()=>{
 console.log("Listening...4200.....");
});
