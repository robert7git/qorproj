import React from 'react'
import PropTypes from 'prop-types'
import isPlainObject from 'is-plain-object'

const isUndefined = v => {
  return typeof v === 'undefined'
}

function makeCls(params) {
  let cls = ''
  const paramKeys = Object.keys(params)

  for (const key of paramKeys) {
    const value = params[key]
    if (!isUndefined(value)) {
      if (isPlainObject(value)) {
        if (value.hide) {
          cls += `hide-${key} `
        }
        if (value.span) {
          cls += `col-${key}-${value.span} `
        }
        if (value.offset) {
          cls += `col-${key}-offset-${value.offset} `
        }
        if (value.push) {
          cls += `col-${key}-push-${value.push} `
        }
        if (value.pull) {
          cls += `col-${key}-pull-${value.pull} `
        }
        if (value.order) {
          cls += `col-${key}-order-${value.order} `
        }
      }

      if (typeof value === 'number') {
        if (key === 'span') {
          cls += `col-${value} `
        } else if (key === 'offset') {
          cls += `col-offset-${value} `
        } else if (key === 'push') {
          cls += `col-push-${value} `
        } else if (key === 'pull') {
          cls += `col-pull-${value} `
        } else if (key === 'order') {
          cls += `col-order-${value} `
        } else {
          cls += `col-${key}-${value} `
        }
      }
      // if (key === 'span') {
      //   cls += `col-${value} `
      // } else if (key === 'offset') {
      //   cls += `col-offset-${value} `
      // } else if (key === 'push') {
      //   cls += `col-push-${value} `
      // } else if (key === 'pull') {
      //   cls += `col-pull-${value} `
      // } else if (key === 'order') {
      //   cls += `col-order-${value} `
      // } else {
      //   cls += `col-${key}-${value} `
      // }
    }

    console.warn(
      `必须是 object -> xs:{span:24, hide:true} 或 number -> xs:{24}, you got ${typeof params[
        key
      ]}`
    )
  }
  return cls
}

export const Col = ({
  span,
  xs,
  s,
  sm,
  md,
  lg,
  xl,
  xxl,
  offset,
  className,
  children,
  ...others
}) => {
  const cls = makeCls({
    span,
    xs,
    s,
    sm,
    md,
    lg,
    xl,
    xxl,
    offset
  })

  return (
    <div {...others} className={`${cls} ${className || ''}`}>
      {children}
    </div>
  )
}

Col.defaultProps = {
  // span:
}
Col.propTypes = {
  children: PropTypes.node,
  span: PropTypes.number,
  xs: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.bool]))
  ]),
  s: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.bool]))
  ]),
  sm: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.bool]))
  ]),
  md: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.bool]))
  ]),
  lg: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.bool]))
  ]),
  xl: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.bool]))
  ]),
  xxl: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.bool]))
  ])
}

export default Col
