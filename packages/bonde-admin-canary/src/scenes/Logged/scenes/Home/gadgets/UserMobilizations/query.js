import gql from "graphql-tag"

export default gql`
  query UserMobilizations($first: Int, $last: Int, $sort: [MobilizationSortEnum]){
    userMobilizations(first: $first, last: $last, sort: $sort) {
      edges {
        node {
          id,
          name,
          community {
            id,
            name
          }
        }
      }
      totalCount
    }
  }
`