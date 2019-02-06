var express = require('express');
var express_graphql = require('express-graphql');
var {buildSchema} = require('graphql');

// GraphQL WSchema
var schema = buildSchema(`
    type Query{
        message:String
    }
`);

//Root Resolver
var root ={
    message:()=> 'Hello World'
};

//Create an express server and a GraphQL endPoint
var app = express();
app.use('/graphql',express_graphql({
    schema: schema,
    rootValue:root,
    graphiql:true
}));

app.listen(4000,()=>console.log('Express Graphql running localhost:4000/graphql'));