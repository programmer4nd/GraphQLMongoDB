const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const { mongoose } = require('mongoose');
const { resolvers } = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefsx } = require('./typeDefs');
//const app = express();
const typeDefs = gql`
  type User {
    id: ID!
    name: String
    mobile: String
    email:String
    status: String
  }
  type Query {
    hello: String!
    GetUserByID(ID:String!):User
    GetUsers(count:Int=100): [User!]!
    totalUsers:Int
  }
  type Mutation {
    createUser(name: String!,mobile: String!,email: String!,status: String="Active"): User!
    updateUser(name: String!,mobile: String!,email: String!,status: Int,id:ID): User!
    deleteUser(id:ID):String 
  }
`;
const createServer = async () => {
  const app = express();
  //console.log(typeDefs);
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({
    schema
  });

  await server.start();
  server.applyMiddleware({ app });
  await mongoose.connect("mongodb://localhost:27017/programmer4nd", {
    useNewUrlParser: true
  });

  //await server.start();

  app.listen({ port: 4001 }, () =>
    console.log(`Server ready at http://localhost:3030${server.graphqlPath}`)
  );
};

createServer();
