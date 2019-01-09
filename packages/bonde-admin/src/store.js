import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import axios from 'axios'
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from 'apollo-cache-inmemory';
import crossStorage from '@/cross-storage-client'
import createReducer from './createReducer'
import DevTools from './components/dev-tools'
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";

const logoutOnCanary = () => {
  const domain = process.env.REACT_APP_DOMAIN_ADMIN_CANARY || 'http://admin-canary.bonde.devel:5002'
  window.location.href = `${domain}/auth/login?next=${window.location.href}`
}

const uriLink = process.env.REACT_APP_DOMAIN_API_GRAPHQL || 'http://api-v2.bonde.devel/graphql';
const httpLink = createHttpLink({ uri: uriLink });

const withToken = setContext(
  request =>
    new Promise((success, fail) => {
      debugger
      const requiredAuth = request.options.headers.authorization !== 'authenticate'
      if (requiredAuth) {
        crossStorage.onConnect()
          .then(() => {
            return crossStorage.get('auth')
          })
          .then(authJson => {
            const auth = JSON.parse(authJson)
            if (auth) {
              // add the authorization to the headers
              success({
                headers: {
                  authorization: `Bearer ${auth.jwtToken}`,
                }
              });
            }
          })
      }

    })
);

const resetToken = onError(({ networkError }) => {
  if (networkError && networkError.name ==='ServerError' && networkError.statusCode === 401) {
    // remove cached token on 401 from the server
    logoutOnCanary();
  }
});

const clientLink = httpLink.concat(withToken.concat(resetToken));

const api = axios.create({
  baseURL: process.env.REACT_APP_DOMAIN_API_REST || 'http://api-v1.bonde.devel'
})

const middlewares = [promise]

export const client = (options = {}) =>
  new ApolloClient({
    link: clientLink,
    cache: new InMemoryCache(),
    ...options
  })

export function configureStore (initialState, thunkExtraArgument) {
  middlewares.push(
    thunk.withExtraArgument({
      axios,
      api,
      ...thunkExtraArgument
    })
  )

  // middlewares.push(client().middleware())

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  let store

  if (process.env.NODE_ENV === 'development') {
    store = createStore(
      createReducer(),
      initialState,
      composeEnhancers(
        applyMiddleware(...middlewares),
        DevTools.instrument()
      )
    )
  } else {
    store = store = createStore(
      createReducer(),
      initialState,
      composeEnhancers(
        applyMiddleware(...middlewares)
      )
    )
  }

  store.asyncReducers = {}

  api.interceptors.response.use(
    response => {
      return response
    },
    ({ response, ...error }) => {
      if (response && response.status === 401) {
        logoutOnCanary()
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ response, ...error })
    }
  )

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./createReducer', () =>
        store.replaceReducer(require('./createReducer').default)
      )
    }
  }

  return store
}

export function injectAsyncReducer (store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(createReducer(store.asyncReducers))
}
