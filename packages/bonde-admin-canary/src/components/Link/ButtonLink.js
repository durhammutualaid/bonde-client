import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'bonde-styleguide'
import PropTypes from 'prop-types'

const ButtonLink = ({ to, title, children, align, ...rest }) => {
  if (to) {
    return (
      <Link to={to} title={title}>
        <Button align={align} {...rest}>
          {children}
        </Button>
      </Link>
    )
  }

  return (
    <Button align={align} {...rest}>
      {children}
    </Button>
  )
}

ButtonLink.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  align: PropTypes.string
}

ButtonLink.defaultProps = {
  align: 'center'
}

export default ButtonLink
