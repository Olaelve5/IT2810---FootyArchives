import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { mergeResolvers } from '@graphql-tools/merge';
import mongoose from 'mongoose';
import resultsTypeDefs from './graphql/typeDefs/resultsTypeDefs';
import nationStatsTypeDefs from './graphql/typeDefs/nationstatsTypeDefs';
import resultsResolvers from './graphql/resolvers/resultsResolvers';
import nationStatsResolvers from './graphql/resolvers/nationStatsResolvers';
import tournamentResolvers from './graphql/resolvers/tournamentResolvers';
import commentResolvers from './graphql/resolvers/commentResolvers';
import commentTypeDefs from './graphql/typeDefs/commentTypeDefs';
import searchResolvers from './graphql/resolvers/searchResolvers';
import userResolvers from './graphql/resolvers/userResolvers';
import userTypeDefs from './graphql/typeDefs/userTypeDefs';

// MongoDB connection string
const MONGODB =
  'mongodb://user12:password12@it2810-36.idi.ntnu.no:27017/footy_archives?authSource=footy_archives&appName=mongosh+2.3.2';

// Combine resolvers
const resolvers = mergeResolvers([
  resultsResolvers,
  nationStatsResolvers,
  tournamentResolvers,
  commentResolvers,
  searchResolvers,
  userResolvers,
]);

// Combine typeDefs
const typeDefs = [resultsTypeDefs, nationStatsTypeDefs, commentTypeDefs, userTypeDefs];

// Define context interface
interface MyContext {
  token?: string;
}

// Create Express app
const app = express();
const httpServer = http.createServer(app);

// Create Apollo Server
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB);
    console.log('MongoDB connected');

    await server.start();

    app.use(
      '/graphql',
      cors<cors.CorsRequest>({
        origin: '*', // Allow multiple origins
        credentials: true,
      }),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({
          token: req.headers.authorization || '',
        }),
      }),
    );

    await new Promise<void>((resolve) => httpServer.listen({ port: 3001 }, resolve));
    console.log('🚀 Server ready at http://it2810-36.idi.ntnu.no:3001/graphql');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

startServer();
