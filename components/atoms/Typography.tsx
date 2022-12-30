import React from 'react'

import TypographyProps from './Typography.props'

const Typography = (props: TypographyProps): JSX.Element => {
  return (
    <span>{props.children}</span>
  )
}

export default Typography
