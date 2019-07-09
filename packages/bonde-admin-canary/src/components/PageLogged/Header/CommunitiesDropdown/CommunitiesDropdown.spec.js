import React from 'react'
import { shallow } from 'enzyme'
import { Dropdown, DropdownItem } from 'bonde-styleguide'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import urljoin from 'url-join'
import CommunitiesDropdown from './CommunitiesDropdown'
import { expect } from 'chai'

describe('components > PageLogged > Header > CommunitiesDropdown > CommunitiesDropdown', () => {
  let node
  let communities

  beforeEach(() => {
    const props = {
      t: (key) => key,
      loading: 'false',
      communities: [
        { id: 1, name: 'C1' },
        { id: 2, name: 'C2' }
      ],
    }
    node = shallow(
      <CommunitiesDropdown
        {...props}
      />
    )
  })

  console.log(node)

  it('render a Dropdown component', () => {
    console.log(node)
    expect(node.length).to.be.equal(1)
  })

  // it('render DropdownItem when data is passed', () => {
  //   node.setProps({ communities })

  //   expect(node.find(DropdownItem).length).to.be.equal(communities.length)
  //   expect(node.find(DropdownItem).at(0).props().children).to.be.equal('C1')
  //   expect(node.find(DropdownItem).at(1).props().children).to.be.equal('C2')
  // })

  // it('render DropdownItem with Link router', () => {
  //   const communities = [{ id: 1, name: 'C1' }]
  //   node.setProps({ communities })
  //   expect(node.find(DropdownItem).props().component).to.be.equal(Link)
  // })

  // it('mount path to redirect with id when pass path', () => {
  //   const communities = [{ id: 1, name: 'C1' }]
  //   node.setProps({ communities, path })
  //   expect(node.find(DropdownItem).props().to).to.be.equal()
  // })
})