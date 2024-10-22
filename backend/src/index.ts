import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import resultsTypeDefs from "./graphql/typeDefs/resultsTypeDefs";
import nationStatsTypeDefs from "./graphql/typeDefs/nationstatsTypeDefs";
import resultsResolvers from "./graphql/resolvers/resultsResolvers";
import nationStatsResolvers from "./graphql/resolvers/nationStatsResolvers";

// MongoDB connection string
const MONGODB =
  "mongodb://user12:password12@it2810-36.idi.ntnu.no:27017/footy_archives?authSource=footy_archives&appName=mongosh+2.3.2";

// Combine resolvers
const resolvers = {
  ...resultsResolvers,
  ...nationStatsResolvers,
};

// Combine typeDefs
const typeDefs = [resultsTypeDefs, nationStatsTypeDefs];

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Connect to MongoDB
mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: 3001 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
