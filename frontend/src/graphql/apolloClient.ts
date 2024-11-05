import { ApolloClient, InMemoryCache } from '@apollo/client';

// VM IP address
const URL = 'http://192.168.29.16:3001/graphql'

const client = new ApolloClient({
  uri: URL,
  cache: new InMemoryCache()
});

export default client;
