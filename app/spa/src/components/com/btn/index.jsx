import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BtnStyle from './Btn.module.scss'
import { is } from '@/utils/helpers'

const prefix = {
  status: '',
  size: '',
  looks: 'looks_',
  level: ''
}

export const Btn = props => {
  const {
    component,
    to,
    disabled,
    size,
    href,
    looks,
    level,
    type,
    className,
    children,
    style,
    block,
    ...others
  } = props

  let cls = `${BtnStyle.btn} `
  cls += is.string(block) ? `${BtnStyle.block} ` : '' // 显示方式
  cls += disabled ? `${BtnStyle[prefix.status + disabled]} ` : '' // 可交互状态
  cls += is.string(size) ? `${BtnStyle[prefix.size + size]} ` : `${BtnStyle[prefix.size + 's']} ` // 大小
  cls += is.string(looks) ? `${BtnStyle[prefix.looks + looks]} ` : `${BtnStyle[prefix.looks + 'default']}` // 样式
  cls += is.string(level) ? `${BtnStyle[prefix.level + level]} ` : `${BtnStyle[prefix.level + 'default']} ` // 视觉级别
  cls += is.string(className) ? `${className} ` : '' // 自定义 额外 class name

  //
  // 如果提供 type = button or submit <button>
  // ------------------------------------------------------
  if ((type && type === 'button') || type === 'submit') {
    return (
      <button type="button" disabled={disabled} style={style} className={cls} {...others}>
        {children}
      </button>
    )
  }

  //
  // 如果提供 to 属性 返回 <Link>
  // ------------------------------------------------------
  if ((to && is.string('string')) || is.object('object')) {
    return (
      <Link to={to} disabled={disabled} style={style} className={cls} {...others}>
        {children}
      </Link>
    )
  }

  //
  // 默认 返回 <a>
  // ------------------------------------------------------
  return (
    <a type="button" disabled={disabled} style={style} className={cls} {...others}>
      {children}
    </a>
  )
}

Btn.defaultProps = {
  className: '',
  size: 'sm',
  looks: 'default',
  children: 'str button',
  disabled: false
}

Btn.propTypes = {
  component: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit']),
  size: PropTypes.oneOf(['xs', 's', 'sm', 'md', 'lg', 'xlg']),
  style: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  looks: PropTypes.oneOf(['default', 'ghost', 'link', 'text']),
  level: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'info', 'danger']),
  block: PropTypes.bool,
  href: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node
}

export default Btn
