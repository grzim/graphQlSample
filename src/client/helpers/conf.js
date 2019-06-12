import ApolloClient from 'apollo-boost'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

export const debounceTimeout = 100;
export const graphQlUri = 'http://localhost:4000'
export const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000`,
  options: {
    reconnect: true
  }
})
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}
export const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
)

export const client = new ApolloClient({
  uri: graphQlUri,
  link,
  defaultOptions
})

export const movieDetails = `        
        title
        description
        minAge`
