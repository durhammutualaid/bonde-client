import PropTypes from 'prop-types'

export const px = (value, defaultValue) => {
  if (value && typeof value === 'number') return `${value}px`
  else if (value && typeof value === 'string') return value
  else if (!value && defaultValue) return `${defaultValue}px`
  else return 0
}

export const borderSpacing = (
  propName = 'margin',
  { top, right, bottom, left, x, y }
) => `
  ${propName}-top: ${px(top, y)};
  ${propName}-bottom: ${px(bottom, y)};
  ${propName}-left: ${px(left, x)};
  ${propName}-right: ${px(right, x)};
`

const { oneOfType, number, string } = PropTypes

export const borderSpacingPropTypes = PropTypes.shape({
  top: oneOfType([number, string]),
  right: oneOfType([number, string]),
  bottom: oneOfType([number, string]),
  left: oneOfType([number, string]),
  x: oneOfType([number, string]),
  y: oneOfType([number, string])
})
