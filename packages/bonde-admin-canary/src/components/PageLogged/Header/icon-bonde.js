import React from 'react'
import PropTypes from 'prop-types'

const IconBonde = ({ size }) => (
  <svg width={size} height='22' viewBox='0 0 83 22' fill='none' xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'>
    <rect y='0.2' width={size} height='21.6' fill='url(#pattern0)' />
    <defs>
      <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1'
        height='1'>
        <use xlinkHref='#image0' transform='matrix(.0032 0 0 .01228 0 -.04)' />
      </pattern>
      <image id='image0' width='313' height='88' xlinkHref='data:image/png;base64,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'
      />
    </defs>
  </svg>
)

IconBonde.defaultProps = {
  size: 83
}

IconBonde.propTypes = {
  size: PropTypes.number
}

export default IconBonde
