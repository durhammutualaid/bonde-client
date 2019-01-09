import gql from 'graphql-tag'

export default gql`
  query fetchDonationGoalStats($widgetId: Int!) {
    data: getWidgetDonationStats(widgetId: $widgetId)
  }
`
