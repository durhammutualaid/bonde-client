const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

module.exports = withCSS(withSass({
    webpack: (config) => {
      // config environment by .env
      config.plugins.push(
        new webpack.EnvironmentPlugin(localEnv)
      )
      // url-loader
      config.module.rules.push({
        test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            publicPath: './',
            outputPath: 'static/',
            name: '[name].[ext]'
          }
        }
      })

      return config
    },
    publicRuntimeConfig: {
      domainApiRest: process.env.REACT_APP_DOMAIN_API_REST,
      domainApiGraphql: process.env.REACT_APP_DOMAIN_API_GRAPHQL,
      domainPublic: process.env.REACT_APP_DOMAIN_PUBLIC,
      pagarmeKey: process.env.REACT_APP_PAGARME_KEY,
      hasuraSecret: process.env.REACT_APP_HASURA_SECRET
    }
  })
)
