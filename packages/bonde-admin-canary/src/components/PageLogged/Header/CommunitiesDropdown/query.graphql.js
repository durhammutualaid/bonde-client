import gql from 'graphql-tag'

export default gql`
query CurrentUserCommunities (
  $offset: Int,
  $limit: Int,
  $orderBy: [UserCommunitiesOrderBy!]
) {
  query: allUserCommunities (offset: $offset, first: $limit, orderBy: $orderBy) {
    nodes {
      id
      name
    }
  }
}
`
