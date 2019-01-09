import gql from 'graphql-tag'

export default gql`
  query watchTwilioCallTransitions($widgetId: Int! $from: String!) {
    watchTwilioCallTransitions(call: {
      widgetId: $widgetId
      from: $from
    }) {
      widgetId
      activistId
      twilioCallId
      twilioCallAccountSid
      twilioCallCallSid
      twilioCallFrom
      twilioCallTo
      twilioCallTransitionId
      twilioCallTransitionSequenceNumber
      twilioCallTransitionStatus
      twilioCallTransitionCallDuration
      twilioCallTransitionCreatedAt
      twilioCallTransitionUpdatedAt
    }
  }
`
