import React from 'react'
import PropTypes from 'prop-types'
import {
  Flexbox2 as Flexbox,
  Header as HeaderStyleguide,
  IconColorful,
  Navbar,
  Spacing
} from 'bonde-styleguide'
// Components
import ActionButton from './ActionButton'
import CommunitiesDropdown from './CommunitiesDropdown'
import MenuCommunity from './MenuCommunity'
import Tabs, { Tab } from './Tabs'
import Title from './Title'
import UserDropdown from './UserDropdown'
import IconBonde from './icon-bonde'

const Bonde = () => <IconBonde size={85} />

const Header = ({
  renderTitle,
  renderActionButtons,
  renderTabs,
  renderMenuCommunity
}) => (
  <HeaderStyleguide>
    {!renderMenuCommunity && (
      <Navbar renderBrand={Bonde}>
        <Flexbox horizontal end>
          <UserDropdown />
        </Flexbox>
      </Navbar>
    )}

    {renderMenuCommunity && (
      <Spacing margin={{ bottom: 16 }}>
        <Navbar>
          <Flexbox horizontal>
            <CommunitiesDropdown />
            <MenuCommunity>
              {renderMenuCommunity()}
            </MenuCommunity>
          </Flexbox>
          <Flexbox horizontal end>
            <UserDropdown />
          </Flexbox>
        </Navbar>
      </Spacing>
    )}

    {renderActionButtons && (
      <Spacing margin={{ top: 16 }}>
        <Navbar>
          <Flexbox horizontal end>
            {renderActionButtons()}
          </Flexbox>
        </Navbar>
      </Spacing>
    )}

    {renderTabs && (
      <Spacing margin={{ bottom: -22 }}>
        <Tabs>
          {renderTabs()}
        </Tabs>
      </Spacing>
    )}

    {renderTitle && (
      <div>
        {renderTitle()}
      </div>
    )}
  </HeaderStyleguide>
)

const { func } = PropTypes

Header.propTypes = {
  renderTitle: func,
  renderActionButtons: func,
  renderTabs: func,
  renderMenuCommunity: func
}

Header.ActionButton = ActionButton

Header.ActionButtonGroup = Flexbox

Header.CommunitiesDropdown = CommunitiesDropdown

Header.MenuCommunity = MenuCommunity

Header.Tab = Tab

Header.Title = Title

export default Header
