var express = require('express');
var express_graphql = require('express-graphql');
var {buildSchema} = require('graphql');

// GraphQL WSchema
var schema = buildSchema(`
    type Query{
       course(id: Int!): Course
       courses(topic:String): [Course]
    }
    type Course{
        id:Int
        title:String
        author:String
        description:String
        topic:String
        url:String
    }
`);

var coursesDate = [
    {
        id:1,
        title:"Titla 1",
        author:'Author 1',
        description: 'Learn NOd',
        topic: 'Node.js',
        url:'https://www.facebook.com'
    },
    {
        id:2,
        title:"Titla 1",
        author:'Author 1',
        description: 'Learn NOd',
        topic: 'Node.js',
        url:'https://www.facebook.com'
    },
    {
        id:3,
        title:"Titla 1",
        author:'Author 1',
        description: 'Learn NOd',
        topic: 'Node.js',
        url:'https://www.facebook.com'
    },
];

var getCourse = function(args){
    var id = args.id;
    return coursesDate.filter(course =>{
        return course.id == id;
    })[0];
};

var getCourses=function(args){
    if(args.topic){
        var topic = args.topic;
        return coursesDate.filter(course => course.topic === topic);
    }else{
        return coursesDate;
    }
};

//Root Resolver
var root ={
    course:getCourse,
    courses:getCourses
};

//Create an express server and a GraphQL endPoint
var app = express();
app.use('/graphql',express_graphql({
    schema: schema,
    rootValue:root,
    graphiql:true
}));

app.listen(4000,()=>console.log('Express Graphql running localhost:4000/graphql'));


/**
query

 query getSingleCourse($courseID: Int!){
  course(id: $courseID){
    title
    author
    description
  }
}



 query variable

 {
  "courseID": 4
}


 **/
