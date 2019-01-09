import gql from 'graphql-tag'

export default gql`
  query CountTwilioCallsByWidget($widgetId: Int!) {
    allTwilioCalls(condition: {
      widgetId: $widgetId
    }) {
      totalCount
    }
  }
`
