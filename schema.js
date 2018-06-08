const{
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean
} = require('graphql');
const Book=require('./model/Book')
//Hardcoded data
// const book=[
// {id:'1',title:'Java How To Program',author:'Harvey Deitel',releaseDate:'1996',summary:'core java'},
// {id:'2',title:'Node How To Program',author:'Ryan',releaseDate:'2020',summary:'Node'},
// {id:'3',title:'C How To Program',author:'Sud',releaseDate:'2014',summary:'C'}
// ];

//book type
const BookType=new GraphQLObjectType({
     name:'Book',
     fields:()=>({
       id:{type:GraphQLString},
       title:{type:GraphQLString},
       author:{type:GraphQLString},
       releaseDate:{type:GraphQLString},
       summary:{type:GraphQLString},
       isAvaliable:{type:GraphQLBoolean}
     })
});

//root query
const RootQuery=new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    book:{
       type:BookType,
       args:{id:{type:GraphQLString}},
       resolve(parent,args){
       return Book.findById(args.id);
      }
    },
    bookAll:{
      type:new GraphQLList(BookType),
      resolve(parentValue, args){
      return Book.find({});
      }
    },
    bookAvaliablity:{
       type:new GraphQLList(BookType),
       args:{isAvaliable:{type:GraphQLBoolean}},
       resolve(parent,args){
       return Book.find(args);
      }
    }
  }
});

const Mutation= new GraphQLObjectType({
  name:'Mutation',
  fields:{
    //adding book in data base
     addBook:{
       type:BookType,
       args:{
         title:{type:new GraphQLNonNull(GraphQLString)},
         author:{type:new GraphQLNonNull(GraphQLString)},
         releaseDate:{type:new GraphQLNonNull(GraphQLString)},
         summary:{type:new GraphQLNonNull(GraphQLString)},
         isAvaliable:{type:new GraphQLNonNull(GraphQLBoolean)},
            },
        resolve(parent, args){
          let book=new Book({
            title:args.title,
            author:args.author,
            releaseDate:args.releaseDate,
            summary:args.summary,
            isAvaliable:args.isAvaliable
          });
          return book.save();
        }
     },
     //updating book
     updateBook:{
       type:BookType,
       args:{
         id:{type:new GraphQLNonNull(GraphQLString)},
         title:{type:GraphQLString},
         author:{type:GraphQLString},
         releaseDate:{type:GraphQLString},
         summary:{type:GraphQLString},
         isAvaliable:{type:GraphQLBoolean}
            },
        resolve(parent, args){
          return Book.findByIdAndUpdate(args.id,args);
          }
     },
    //borrowBook
     borrowBook:{
       type:BookType,
       args:{
         id:{type:new GraphQLNonNull(GraphQLString)},
         isAvaliable:{type:new GraphQLNonNull(GraphQLBoolean)}
            },
        resolve(parent, args){
           return Book.findByIdAndUpdate(args.id,args)
          }
     },
     //Return
     borrowBook:{
       type:BookType,
       args:{
         id:{type:new GraphQLNonNull(GraphQLString)},
         isAvaliable:{type:new GraphQLNonNull(GraphQLBoolean)}
            },
        resolve(parent, args){
           return Book.findByIdAndUpdate(args.id,args);
          }
     }

  }
});

module.exports= new GraphQLSchema({
  query:RootQuery,
  mutation:Mutation
});
