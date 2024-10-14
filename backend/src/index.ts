import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

// MongoDB connection string
const MONGODB = "mongodb://user12:password12@it2810-36.idi.ntnu.no:27017/footy_archives?authSource=footy_archives&appName=mongosh+2.3.2";

// Create Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Connect to MongoDB
mongoose.connect(MONGODB)
.then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: 3001 });
})
.then((res) => {
    console.log(`Server running at ${res.url}`);
})
.catch(err => {
    console.error("MongoDB connection error:", err);
});
