import React from 'react'
import Compostyle from './Compo.module.scss'

export const Textarea = props => {
  const {
    size,
    className,
    cols,
    rows,
    onChange,
    placeholder,
    value,
    ...otherProps
  } = props
  const extraCls = className ? Compostyle.className : ''
  const cls = `${Compostyle.textarea} ${Compostyle[size || 'md']}`

  const textProps = {
    className: `${cls},${extraCls}`,
    cols,
    rows,
    onChange,
    placeholder,
    value
  }
  return <textarea {...textProps} {...otherProps} />
}

// export class Textarea extends React.Component {
//   render() {
//     const { size, className, cols, rows, onChange, placeholder, value } = this.props
//     const extraCls = className ? style.className : ''
//     const cls = `${style.textarea} ${style[size || 'md']}`

//     return <textarea className={`${cls} ${extraCls}`} cols={cols} rows={rows} onChange={onChange} placeholder={placeholder} value={value} {...this.props} />
//   }
// }
