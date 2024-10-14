import { ApolloServer } from "apollo-server";
import { Mongoose } from "mongoose";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

const MONGODB =
  "mongodb://user12:password12@it2810-36.idi.ntnu.no:27017/?directConnection=true&authSource=footy_archives&appName=mongosh+2.3.2";

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const mongoose = new Mongoose();

mongoose.connect(MONGODB)
    .then(() => {
        console.log("MongoDB connected");
        return server.listen({ port: 3001 });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })