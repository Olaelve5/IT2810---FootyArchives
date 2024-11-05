import { ApolloClient, InMemoryCache } from '@apollo/client';

// VM IP address
const URL = 'http://it2810-36.idi.ntnu.no:3001/graphql'

const client = new ApolloClient({
  uri: URL,
  cache: new InMemoryCache()
});

export default client;
