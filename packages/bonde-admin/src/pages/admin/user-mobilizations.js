import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'graphql'

const USER_MOBILIZATIONS_QUERY = gql`
query UserMobilizationsQuery (
  $offset: Int,
  $limit: Int,
  $orderBy: [UserMobilizationsOrderBy!]
) {
  allUserMobilizations (offset: $offset, first: $limit, orderBy: $orderBy) {
    nodes {
      id
      name
      createdAt
      updatedAt
      colorScheme
      googleAnalyticsCode
      goal
      headerFont
      bodyFont
      facebookShareTitle
      facebookShareDescription
      facebookShareImage
      slug
      customDomain
      twitterShareText
      community {
        id
      }
      status
    }
    totalCount
  }
}
`
/**
 * Fetch current user mobilizations, replace community context.
 */
class UserMobilizations extends React.Component {
  render () {
    const { children, data: { loading, allUserMobilizations } } = this.props
    return children({
      loading,
      mobilizations: allUserMobilizations ? allUserMobilizations.nodes : []
    })
  }
}

export default graphql(USER_MOBILIZATIONS_QUERY)(UserMobilizations)
