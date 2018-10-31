import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { authSession } from 'services/auth'
import { CatchLink, onCatch } from './CatchLink'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:3001/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = authSession.getToken()

  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    }
  }
  return { headers }
})


const handleError = onCatch(({ response, networkError }) => { 
  if (networkError && (networkError.statusCode === 401 || networkError.statusCode === 403)) {
    const redirectTo = authSession.getItem('redirectTo')
    
    authSession
      .logout()
      .then(() => {
        if (redirectTo) {
          window.location.href = `/auth/login?next=${redirectTo}`
        } else {
          window.location.href = '/auth/login'
        }
      })
  }
})

const client = new ApolloClient({
  link: CatchLink.from([
    authLink,
    handleError,
    httpLink
  ]),
  cache: new InMemoryCache()
})

export default client
