import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { mergeResolvers } from '@graphql-tools/merge';
import mongoose from 'mongoose';
import resultsTypeDefs from './graphql/typeDefs/resultsTypeDefs';
import nationStatsTypeDefs from './graphql/typeDefs/nationstatsTypeDefs';
import resultsResolvers from './graphql/resolvers/resultsResolvers';
import nationStatsResolvers from './graphql/resolvers/nationStatsResolvers';
import tournamentResolvers from './graphql/resolvers/tournamentResolvers';
import commentResolvers from './graphql/resolvers/commentResolvers';
import commentTypeDefs from './graphql/typeDefs/commentTypeDefs';

// MongoDB connection string
const MONGODB =
  'mongodb://user12:password12@it2810-36.idi.ntnu.no:27017/footy_archives?authSource=footy_archives&appName=mongosh+2.3.2';

// Combine resolvers
const resolvers = mergeResolvers([
  resultsResolvers,
  nationStatsResolvers,
  tournamentResolvers,
  commentResolvers,
]);

// Combine typeDefs
const typeDefs = [resultsTypeDefs, nationStatsTypeDefs, commentTypeDefs];

// Define context interface
interface MyContext {
  token?: string;
}

// Create Apollo Server
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

// Connect to MongoDB and start the server
async function startServer() {
  try {
    await mongoose.connect(MONGODB);
    console.log('MongoDB connected');

    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => ({ token: req.headers.authorization || '' }),
      listen: { port: 3001 },
    });

    console.log(`Server running at ${url}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

startServer();