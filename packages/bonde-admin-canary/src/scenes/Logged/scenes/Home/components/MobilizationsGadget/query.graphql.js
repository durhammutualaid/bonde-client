import gql from 'graphql-tag'

export default gql`
query MobilizationsGadget ($offset: Int, $limit: Int, $orderBy: [UserMobilizationsOrderBy!]) {
  allUserMobilizations  (offset: $offset, first: $limit, orderBy: $orderBy) {
    nodes {
      id
      name
      status
      community {
        id
        name
        city
        description
        image
        createdAt
        updatedAt
        fbLink
        twitterLink
      }
      score
      image: facebookShareImage
    }
    totalCount
  }
}
`
