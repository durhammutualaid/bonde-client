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
import Tabs, { Tab } from './Tabs'
import Title from './Title'
import UserDropdown from './UserDropdown'

const Bonde = () => (
  <Spacing margin={{ right: 15, bottom: 10 }}>
    <IconColorful name='bonde' size={85} inverted />
  </Spacing>
)

const RenderElement = ({ component }) => {
  switch (typeof component) {
    case 'string':
      return <Title>{component}</Title>
    case 'function':
      return component()
    case 'object':
      return component
    default:
      return <div className='render-element-undefined' />
  }
}

const Header = ({
  title,
  actions,
  tabs,
  dropdown
}) => {
  return (
    <HeaderStyleguide>
      <Navbar
        renderBrand={dropdown ? () => (
          <Spacing margin={{ bottom: 10 }}>
            <RenderElement component={dropdown} />
          </Spacing>
         ) : Bonde}
      >
        <Flexbox horizontal end>
          <UserDropdown />
        </Flexbox>
      </Navbar>

      {actions && (
        <Spacing margin={{ top: 16 }}>
          <Navbar>
            <Flexbox horizontal end>
              <RenderElement component={actions} />
            </Flexbox>
          </Navbar>
        </Spacing>
      )}

      {tabs && (
        <Spacing margin={{ bottom: -22 }}>
          <Tabs>
            <RenderElement component={tabs} />
          </Tabs>
        </Spacing>
      )}

      {title ? (
        <Spacing margin={{ top: 25, bottom: 10 }}>
          <RenderElement component={title} />
        </Spacing>
      ) : <div />}
    </HeaderStyleguide>
  )
}

const { oneOfType, func, string, object } = PropTypes

Header.propTypes = {
  title: oneOfType([func, string, object]),
  actions: oneOfType([func, string, object]),
  tabs: oneOfType([func, string, object]),
  dropdown: oneOfType([func, string, object])
}

Header.ActionButton = ActionButton

Header.ActionButtonGroup = Flexbox

Header.Tab = Tab

Header.Title = Title

export default Header
