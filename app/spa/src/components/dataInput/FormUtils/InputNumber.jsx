import React from 'react'
import InputNumber from 'rc-input-number'
import 'rc-input-number/assets/index.css'

export default ({ input, defaultValue, style, placeholder, ...otherProps }) => {
  return (
    <InputNumber focusOnUpDown={false} defaultValue={0} style={style} {...input} {...otherProps} />
  )
}
