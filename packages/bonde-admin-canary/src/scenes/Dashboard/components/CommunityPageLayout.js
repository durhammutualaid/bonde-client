import React from 'react'
import { withRouter } from 'react-router'
import { Flexbox2 as Flexbox, Spacing } from 'bonde-styleguide'
import { PageLayout } from 'services/router'
import UserCommunities from './UserCommunities'
import CommunitiesDropdown from './CommunitiesDropdown'
import CommunityMenu from './CommunityMenu'
import CommunityPageTabs from './CommunityPageTabs'

/**
  * CommmunityPageLayout renders a module application, here
  * on UI receive a new dropdown in Header and create a context
  * of community that will be like componentProps to component
  * render.
  *
  */
const CommunityPageLayout = withRouter(
  ({ location, match, path, history, pageProps, componentProps, tabs, loading: Loading, ...rest }) => (
    <UserCommunities component={
      ({ communities, loading }) => {
        if (loading && Loading) return <Loading />

        // selecionar comunidade de acordo com identificador no pathname
        const matches = location.pathname.match(/^\/admin\/\d+/g)
        let communityId = null
        if (matches && matches.length === 1) {
          communityId = Number(matches[0].replace('/admin/', ''))
        }
        // TODO: check a better trick to resolve this case
        const baseUrl = path.replace(':communityId', communityId)
        const community = communities.filter(c => c.id === communityId)[0]

        // manipular renderização do Header de PageLayout
        const newPageProps = {
          ...pageProps,
          // eslint-disable-next-line react/display-name
          tabs: tabs ? () => (
            <CommunityPageTabs
              location={location}
              baseUrl={baseUrl}
              community={community}
              tabs={tabs}
            />
          ) : undefined,
          // eslint-disable-next-line react/display-name
          dropdown: () => (
            <Flexbox horizontal>
              <CommunitiesDropdown
                communities={communities}
                communityId={communityId}
                onChange={c => {
                  if (c.id !== communityId) {
                    history.push(
                      location
                        .pathname
                        .replace(/admin\/[0-9]+/, `admin/${c.id}`)
                    )
                  }
                }}
              />
              <Spacing margin={{ left: 10 }}>
                <CommunityMenu
                  dark
                  pathname={location.pathname}
                  community={community}
                />
              </Spacing>
            </Flexbox>
          )
        }

        // extender PageLayout com novo Header contendo CommunitiesDropdown
        return (
          <PageLayout
            path={path}
            pageProps={newPageProps}
            componentProps={{ ...componentProps, community }}
            {...rest}
          />
        )
      }}
    />
  )
)

export default CommunityPageLayout
