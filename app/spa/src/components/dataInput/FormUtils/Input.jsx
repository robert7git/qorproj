import React from 'react'
import style from './Compo.module.scss'

/**
 * Input Component
 */
const Input = ({
  type,
  size,
  block,
  className,

  onChange,
  placeholder,
  value,
  ...others
}) => {
  const extraCls = className ? style.className : ''
  let cls = block ? `${style.block} ` : ''
  cls += size ? `${style[size || 'md']} ` : ''
  cls += `${style.input} `

  return (
    <input
      className={`${cls} ${extraCls}`}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      {...others}
    />
  )
}

export { Input }
