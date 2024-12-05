import { ApolloClient, InMemoryCache } from '@apollo/client';


// Switch between these for production/development

// const URL = 'http://it2810-36.idi.ntnu.no:3001/graphql'
// const URL = 'http://localhost:3001/graphql'

// Needed for mobile testing
const URL = 'http://10.52.203.44:3001/graphql'



const client = new ApolloClient({
  uri: URL,
  cache: new InMemoryCache()
});

export default client;
